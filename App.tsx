import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { StoreFront } from './views/StoreFront';
import { CartView } from './views/CartView';
import { AdminView } from './views/AdminView';
import { ProfileView } from './views/ProfileView';
import { UserRole } from './types';

// Simple Modal for Login
const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const { login } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      login(username, UserRole.ADMIN);
      onClose();
    } else if (username === 'demo' && password === 'demo') {
      login(username, UserRole.CLIENT);
      onClose();
    } else {
      setError('Nieprawidłowe dane. Spróbuj: admin/admin lub demo/demo');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Zaloguj się</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Login</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hasło</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
              <span>admin / admin</span>
              <span>demo / demo</span>
          </div>
          <div className="flex space-x-4 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button 
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckoutSuccess = () => {
    const { setView } = useStore();
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Dziękujemy za zamówienie!</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Twoje zamówienie zostało przyjęte do realizacji. Potwierdzenie wysłaliśmy na Twój adres email.
            </p>
            <button 
                onClick={() => setView('store')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
                Wróć na stronę główną
            </button>
        </div>
    )
}

const MainContent = () => {
  const { view } = useStore();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <Navbar onOpenLogin={() => setShowLogin(true)} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'store' && <StoreFront />}
        {view === 'cart' && <CartView />}
        {view === 'admin' && <AdminView />}
        {view === 'profile' && <ProfileView />}
        {view === 'checkout-success' && <CheckoutSuccess />}
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 ElektroShop. Projekt Zaliczeniowy.</p>
          <p className="text-xs mt-2 text-gray-600">
              Frontend Simulation (React + Tailwind). Backend Logic mocked via Context.
          </p>
        </div>
      </footer>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
};

export default App;