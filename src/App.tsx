import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="max-w-md mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact/:id" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;