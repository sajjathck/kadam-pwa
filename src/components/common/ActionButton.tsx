import { ReactNode } from 'react';

interface ActionButtonProps {
  children: ReactNode;
  onClick: () => void;
  type: 'Received' | 'Given';
  disabled?: boolean;
}

export default function ActionButton({
  children,
  onClick,
  type,
  disabled = false,
}: ActionButtonProps) {
  const baseStyles = 'flex-1 py-2 rounded-md font-medium m-1 text-center transition-colors duration-200';
  const typeStyles = type === 'Received' 
    ? 'bg-receivable text-white hover:bg-receivable/90' 
    : 'bg-owed text-white hover:bg-owed/90';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${typeStyles} ${disabledStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}