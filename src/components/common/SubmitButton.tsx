interface SubmitButtonProps {
    onClick: () => void;
    label?: string;
  }
  
  export default function SubmitButton({
    onClick,
    label = 'Submit',
  }: SubmitButtonProps) {
    return (
      <button
        className="px-4 py-2 bg-primary text-white rounded-lg"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }