import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../useStorage.ts';
import AddContactModal from './common/AddContactModal.tsx';
import Toast from './common/Toast.tsx';
import type { Contact } from '../types/index.ts';

export default function Home() {
  const { contacts, addContact } = useStorage();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const handleAddContact = (name: string) => {
    const id = addContact(name);
    if (id) {
      setShowModal(false);
      setToast('Contact added!');
      setTimeout(() => setToast(''), 2000);
      navigate(`/contact/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      {/* Header with Search Bar */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Kadam</h1>
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search Contact"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </header>

      {/* Contact List */}
      {contacts.length === 0 ? (
        <div className="text-center mt-40">
          <p className="text-gray-700 font-medium">No contacts yet.</p>
          <p className="text-gray-700 font-medium">Add a contact to start tracking.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact: Contact) => (
            <div
              key={contact.id}
              className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center cursor-pointer"
              onClick={() => navigate(`/contact/${contact.id}`)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-receivable rounded-full flex items-center justify-center text-white text-lg font-medium">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{contact.name}</p>
                  <p className="text-gray-500 text-sm">1 month ago</p>
                </div>
              </div>
              <span
                className={
                  contact.balance < 0 ? 'text-owed' : 'text-receivable'
                }
              >
                {contact.balance < 0 ? '-' : '+'} ₹
                {Math.abs(contact.balance).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add Contact Button (FAB) */}
      {contacts.length > 0 && (
        <button
          className="fixed bottom-4 right-4 w-12 h-12 bg-receivable text-white rounded-full flex items-center justify-center text-2xl shadow-lg font-medium"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      )}

      {/* Add Contact Modal */}
      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddContact}
        />
      )}

      {/* Toast Notification */}
      {toast && <Toast message={toast} />}
    </div>
  );
}