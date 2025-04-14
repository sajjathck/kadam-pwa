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

    // Calculate new balance for the contact
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return false;
    const newBalance = type === 'Given' 
      ? contact.balance - parsedAmount 
      : contact.balance + parsedAmount;

    // Create transaction with timestamp and balance
    const transaction: Transaction = {
      id: Date.now().toString(),
      contactId,
      amount: parsedAmount,
      type,
      date: new Date(timestamp).toISOString().split('T')[0], // Keep for legacy
      timestamp,
      balance: newBalance,
    };

    // Update transactions and contacts
    setTransactions([...transactions, transaction]);
    setContacts(
      contacts.map((c) =>
        c.id === contactId ? { ...c, balance: newBalance } : c
      )
    );
    return true;
  };

  return { contacts, transactions, addContact, addTransaction };
}