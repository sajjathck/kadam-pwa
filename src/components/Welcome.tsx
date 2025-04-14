import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col items-center justify-between h-screen p-4 text-center">
      <div className="text-6xl">💰</div>
      <h2 className="text-lg text-gray-900 font-bold">Kadam App</h2>
      <button
        className="w-48 py-3 bg-receivable rounded-lg font-semibold"
        onClick={() => navigate('/home')}
      >
       Shall we enter?
      </button>
    </div>
  );
}