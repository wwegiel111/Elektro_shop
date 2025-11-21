import React from 'react';
import { useStore } from '../context/StoreContext';

export const ProfileView: React.FC = () => {
  const { user, orders } = useStore();
  
  if (!user) return null;

  const myOrders = orders.filter(o => o.userId === user.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Moje Konto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-500">Nazwa użytkownika</label>
                <p className="text-lg font-medium">{user.username}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg font-medium">{user.email}</p>
            </div>
        </div>
        <div className="mt-6">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Zmień hasło
            </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Historia Zamówień</h3>
      {myOrders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
            Nie masz jeszcze żadnych zamówień.
        </div>
      ) : (
        <div className="space-y-4">
             {myOrders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-bold text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {order.status}
                        </span>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <ul className="space-y-2 mb-4">
                            {order.items.map(item => (
                                <li key={item.id} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>{(item.price * item.quantity).toFixed(2)} zł</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center font-bold pt-2 border-t border-gray-100">
                            <span>Razem:</span>
                            <span className="text-blue-600">{order.total.toFixed(2)} zł</span>
                        </div>
                    </div>
                </div>
             ))}
        </div>
      )}
    </div>
  );
}
