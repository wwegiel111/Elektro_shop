import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { TrashIcon } from '../components/Icons';

export const CartView: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder, user, setView } = useStore();
  const [guestEmail, setGuestEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(guestEmail || undefined);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Twój koszyk jest pusty</h2>
        <p className="text-gray-600 mb-6">Wygląda na to, że nic jeszcze nie dodałeś.</p>
        <button 
          onClick={() => setView('store')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Wróć do sklepu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Twój Koszyk</h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <ul className="divide-y divide-gray-200">
          {cart.map(item => (
            <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0" />
              <div className="flex-1 sm:ml-6 text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.category}</p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex items-center border rounded-lg mr-6">
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >-</button>
                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >+</button>
                </div>
                <span className="text-lg font-bold text-gray-900 w-24 text-right">
                  {(item.price * item.quantity).toFixed(2)} zł
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-6 text-red-500 hover:text-red-700"
                  title="Usuń"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 p-6 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Suma:</span>
            <span className="text-3xl font-bold text-blue-600">{total.toFixed(2)} zł</span>
        </div>
      </div>

      {!isCheckingOut ? (
        <div className="flex justify-end space-x-4">
           <button 
            onClick={() => setView('store')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Kontynuuj zakupy
          </button>
          <button 
            onClick={() => setIsCheckingOut(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md"
          >
            Przejdź do kasy
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Dane do zamówienia</h3>
          <form onSubmit={handleCheckout} className="space-y-4">
            {!user && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres Email (do potwierdzenia)
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="klient@przyklad.pl"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Kupujesz jako gość. Rejestracja nie jest wymagana.</p>
              </div>
            )}
            {user && (
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                    <p className="text-blue-800 font-medium">Jesteś zalogowany jako: {user.username}</p>
                    <p className="text-sm text-blue-600">{user.email}</p>
                </div>
            )}

            <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2">Metoda Płatności (Symulacja)</h4>
                <div className="flex gap-4">
                     <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" defaultChecked className="text-blue-600" />
                        <span className="ml-2">Przelew PayU (Sandbox)</span>
                     </label>
                     <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" className="text-blue-600" />
                        <span className="ml-2">Płatność przy odbiorze</span>
                     </label>
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button 
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Wróć
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-md transition-transform transform hover:scale-105"
              >
                Zamawiam i płacę
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};