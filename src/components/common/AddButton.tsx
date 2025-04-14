interface AddButtonProps {
    onClick: () => void;
    isFab?: boolean;
  }
  
  export default function AddButton({ onClick, isFab = false }: AddButtonProps) {
    return (
      <button
        className={
          isFab
            ? 'fixed bottom-4 right-4 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl shadow-lg'
            : 'w-full bg-primary text-white py-3 rounded-lg'
        }
        onClick={onClick}
      >
        {isFab ? '+' : 'Add Contact'}
      </button>
    );
  }