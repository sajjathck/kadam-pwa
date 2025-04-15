import { useState, useEffect } from 'react';
import { Contact, Transaction } from './types';

export function useStorage() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addContact = (name: string): string | null => {
    if (!name.trim()) return null;
    const id = Date.now().toString();
    setContacts([...contacts, { id, name, balance: 0 }]);
    return id;
  };

  const addTransaction = (
    contactId: string,
    amount: number,
    type: 'Given' | 'Received',
    timestamp: string
  ): boolean => {
    const parsedAmount = parseFloat(amount.toString());
    if (isNaN(parsedAmount) || parsedAmount <= 0) return false;

    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return false;
    const newBalance = type === 'Given' 
      ? contact.balance - parsedAmount 
      : contact.balance + parsedAmount;

    const transaction: Transaction = {
      id: Date.now().toString(),
      contactId,
      amount: parsedAmount,
      type,
      date: new Date(timestamp).toISOString().split('T')[0],
      timestamp,
      balance: newBalance,
    };

    setTransactions([...transactions, transaction]);
    setContacts(
      contacts.map((c) =>
        c.id === contactId ? { ...c, balance: newBalance } : c
      )
    );
    return true;
  };

  const deleteTransaction = (transactionId: string): boolean => {
    const transactionToDelete = transactions.find(t => t.id === transactionId);
    if (!transactionToDelete) return false;

    const contact = contacts.find(c => c.id === transactionToDelete.contactId);
    if (!contact) return false;

    // Recalculate balance by removing the transaction's effect
    const updatedTransactions = transactions.filter(t => t.id !== transactionId);
    const remainingTransactions = updatedTransactions.filter(t => t.contactId === contact.id);
    const newBalance = remainingTransactions.reduce((sum, t) => 
      sum + (t.type === 'Given' ? -t.amount : t.amount), 0);

    setTransactions(updatedTransactions);
    setContacts(
      contacts.map(c =>
        c.id === contact.id ? { ...c, balance: newBalance } : c
      )
    );
    return true;
  };

  const editTransaction = (
    transactionId: string,
    amount: number,
    type: 'Given' | 'Received',
    timestamp: string
  ): boolean => {
    const parsedAmount = parseFloat(amount.toString());
    if (isNaN(parsedAmount) || parsedAmount <= 0) return false;

    const transactionToEdit = transactions.find(t => t.id === transactionId);
    if (!transactionToEdit) return false;

    const contact = contacts.find(c => c.id === transactionToEdit.contactId);
    if (!contact) return false;

    // Calculate old effect on balance
    const oldEffect = transactionToEdit.type === 'Given' ? -transactionToEdit.amount : transactionToEdit.amount;
    // Calculate new effect on balance
    const newEffect = type === 'Given' ? -parsedAmount : parsedAmount;
    const balanceDelta = newEffect - oldEffect;

    const updatedTransaction: Transaction = {
      ...transactionToEdit,
      amount: parsedAmount,
      type,
      timestamp,
      date: new Date(timestamp).toISOString().split('T')[0],
      balance: contact.balance + balanceDelta, // Update balance based on delta
    };

    const updatedTransactions = transactions.map(t =>
      t.id === transactionId ? updatedTransaction : t
    );
    const newBalance = contact.balance + balanceDelta;

    setTransactions(updatedTransactions);
    setContacts(
      contacts.map(c =>
        c.id === contact.id ? { ...c, balance: newBalance } : c
      )
    );
    return true;
  };

  return { contacts, transactions, addContact, addTransaction, deleteTransaction, editTransaction };
}