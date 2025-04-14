interface ToastProps {
    message: string;
  }
  
  export default function Toast({ message }: ToastProps) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        {message}
      </div>
    );
  }