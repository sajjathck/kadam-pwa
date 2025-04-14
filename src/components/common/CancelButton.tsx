interface CancelButtonProps {
    onClick: () => void;
  }
  
  export default function CancelButton({ onClick }: CancelButtonProps) {
    return (
      <button
        className="px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg text-gray-600"
        onClick={onClick}
      >
        Cancel
      </button>
    );
  }