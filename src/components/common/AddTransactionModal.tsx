import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorage } from '../../useStorage.ts';
import Toast from './Toast.tsx';

interface AddTransactionModalProps {
  onClose: () => void;
  type: 'Given' | 'Received';
  onSubmit: (amount: number, type: 'Given' | 'Received', timestamp: string) => void;
}

export default function AddTransactionModal({
  onClose,
  type,
  onSubmit,
}: AddTransactionModalProps) {
  const { id } = useParams<{ id: string }>();
  const { contacts } = useStorage();
  const contact = contacts.find((c) => c.id === id);
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [timestamp, setTimestamp] = useState(new Date().toISOString().slice(0, 16)); // Includes date and time
  const [toast, setToast] = useState('');

  // Show additional fields only if amount is non-empty and valid
  const showDetails = amount.trim().length > 0 && !isNaN(parseFloat(amount));

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSubmit(parsedAmount, type, timestamp);
      setToast('Transaction added!');
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-2xl text-primary"
            onClick={onClose}
          >
            ←
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'Given' ? 'Purchase of ₹' : 'Received ₹'} {amount || '0'} from{' '}
            {contact?.name || 'Contact'}
          </h2>
          <span></span> {/* Placeholder for symmetry */}
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
            min="0"
            step="0.01"
          />
        </div>

        {/* Conditional Details and Date */}
        {showDetails && (
          <div className="space-y-6 mb-6 text-gray-900">
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter Details (Item Name, Bill No., Quantity...)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Save Button */}
        <button
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold"
          onClick={handleSubmit}
          disabled={!showDetails}
        >
          Save
        </button>

        {/* Toast Notification */}
        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}