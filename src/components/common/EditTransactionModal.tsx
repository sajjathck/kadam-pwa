import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from './Toast.tsx';
import type { Transaction } from '../../types/index.ts';

interface EditTransactionModalProps {
  onClose: () => void;
  onSubmit: (amount: number, type: 'Given' | 'Received', timestamp: string) => void;
  type: 'Given' | 'Received';
  transaction: Transaction;
  contactName: string; // New prop for contact name
}

export default function EditTransactionModal({
  onClose,
  onSubmit,
  type,
  transaction,
  contactName,
}: EditTransactionModalProps) {
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [details, setDetails] = useState('');
  const [timestamp, setTimestamp] = useState(() => {
    const date = new Date(transaction.timestamp);
    if (isNaN(date.getTime())) {
      return new Date().toISOString().slice(0, 16);
    }
    return date.toISOString().slice(0, 16);
  });
  const [toast, setToast] = useState('');

  const showDetails = amount.trim().length > 0 && !isNaN(parseFloat(amount));

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSubmit(parsedAmount, type, timestamp);
      setToast('Transaction updated!');
      setTimeout(() => {
        setToast('');
        onClose();
      }, 2000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button className="text-2xl text-primary" onClick={onClose}>←</button>
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'Given' ? 'Purchase of ₹' : 'Received ₹'} {amount || '0'} from {contactName}
          </h2>
          <span></span>
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
            min="0"
            step="0.01"
          />
        </div>
        {showDetails && (
          <div className="space-y-4 mb-4 text-gray-900">
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter Details (Item Name, Bill No., Quantity...)"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={100}
            />
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
        <button
          className="w-full py-2 bg-primary text-white rounded-md font-semibold"
          onClick={handleSubmit}
          disabled={!showDetails}
        >
          Save
        </button>
        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}