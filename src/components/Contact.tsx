import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStorage } from '../useStorage';
import ActionButton from './common/ActionButton';
import AddTransactionModal from './common/AddTransactionModal';
import Toast from './common/Toast';
import type { Contact } from '../types/index.ts';
import type { Transaction } from '../types/index.ts';

export default function Contact() {
  const { id } = useParams<{ id: string }>();
  const { contacts, transactions, addTransaction } = useStorage();
  const contact = contacts.find((c: Contact) => c.id === id);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<'Given' | 'Received'>('Received');
  const [toast, setToast] = useState('');

  if (!contact) return <div>Contact not found</div>;

  const handleAddTransaction = (amount: number, type: 'Given' | 'Received', timestamp: string) => {
    const success = addTransaction(contact.id, amount, type, timestamp);
    if (success) {
      setShowModal(false);
      setToast('Transaction added!');
      setTimeout(() => setToast(''), 2000);
    }
  };

  const contactTransactions = transactions.filter(
    (t: Transaction) => t.contactId === id
  );

  // Sort transactions by timestamp in descending order (latest first)
  const sortedTransactions = [...contactTransactions].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Calculate balance at each transaction
  const transactionsWithBalance = sortedTransactions.map((t, index) => {
    const prevTransactions = sortedTransactions.slice(0, index);
    const prevBalance = prevTransactions.reduce((sum, pt) => 
      sum + (pt.type === 'Given' ? -pt.amount : pt.amount), 0);
    return {
      ...t,
      balance: prevBalance + (t.type === 'Given' ? -t.amount : t.amount),
    };
  });

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <header className="flex items-center justify-between py-4">
        <button
          className="text-2xl text-primary mr-4"
          onClick={() => navigate('/home')}
        >
          ←
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
        </div>
        <div
          className={`text-2xl font-medium ${contact.balance < 0 ? 'text-owed' : 'text-receivable'}`}
        >
          {contact.balance < 0 ? '-' : '+'} ₹{Math.abs(contact.balance).toFixed(2)}
        </div>
      </header>
      <div className="mt-4">
        {contactTransactions.length === 0 ? (
          <p className="text-center text-gray-600 font-medium">
            No transactions yet. Add one below.
          </p>
        ) : (
          transactionsWithBalance.map((t: Transaction & { balance: number }) => (
            <div
              key={t.id}
              className="bg-white p-2 mb-1 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <div className="text-xs text-gray-600 font-medium">
                  {new Date(t.timestamp).toLocaleString()}
                </div>
                <div className="text-xs text-gray-900">
                  Balance: {t.balance < 0 ? '-' : '+'} ₹{Math.abs(t.balance).toFixed(2)}
                </div>
              </div>
              <div
                className={t.type === 'Given' ? 'text-owed' : 'text-receivable'}
              >
                {t.type === 'Given' ? '-' : '+'} ₹{t.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between py-4 sticky bottom-0 bg-neutral-50">
        <ActionButton
          type="Received"
          onClick={() => {
            setType('Received');
            setShowModal(true);
          }}
        >
          Received
        </ActionButton>
        <ActionButton
          type="Given"
          onClick={() => {
            setType('Given');
            setShowModal(true);
          }}
        >
          Given
        </ActionButton>
      </div>
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddTransaction}
          type={type}
        />
      )}
      {toast && <Toast message={toast} />}
    </div>
  );
}