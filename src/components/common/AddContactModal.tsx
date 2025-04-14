import { useState } from 'react';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

interface AddContactModalProps {
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function AddContactModal({
  onClose,
  onSubmit,
}: AddContactModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    onSubmit(name);
    setName('');
    setError('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-neutral-50 p-6 rounded-xl w-4/5 max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">Add Contact</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter name"
          className="w-full p-2 mt-4 border border-neutral-100 rounded-lg"
        />
        {error && <p className="text-owed text-sm mt-2">{error}</p>}
        <div className="flex justify-end mt-4 gap-2">
          <SubmitButton onClick={handleSubmit} label="Add" />
          <CancelButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
}