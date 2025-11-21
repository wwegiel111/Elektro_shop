import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrashIcon } from '../components/Icons';
import { CATEGORIES } from '../mockData';

export const AdminView: React.FC = () => {
  const { products, orders, setProducts } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'sql' | 'stats'>('products');

  // Mock stats data
  const statsData = [
    { name: 'Pn', sales: 4000 },
    { name: 'Wt', sales: 3000 },
    { name: 'Śr', sales: 2000 },
    { name: 'Cz', sales: 2780 },
    { name: 'Pt', sales: 1890 },
    { name: 'Sb', sales: 2390 },
    { name: 'Nd', sales: 3490 },
  ];

  const generateSQL = () => {
    return `
-- SKRYPT TWORZĄCY BAZĘ DANYCH (Zgodnie z wytycznymi)

CREATE DATABASE IF NOT EXISTS elektro_shop;
USE elektro_shop;

-- Tabela Użytkowników
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('admin', 'employee', 'client') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Produktów
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    description TEXT,
    image_url VARCHAR(255)
);

-- Tabela Zamówień
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela Elementów Zamówienia
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Przykładowe dane (Mock Data Insert)
INSERT INTO products (name, category, price, stock_quantity) VALUES
${products.map(p => `('${p.name}', '${p.category}', ${p.price}, ${p.stock})`).join(',\n')};
    `.trim();
  };

  const handleDeleteProduct = (id: number) => {
    if(window.confirm("Czy na pewno usunąć produkt?")) {
        setProducts(products.filter(p => p.id !== id));
    }
  }

  return (
    <div className="bg-white rounded-lg shadow min-h-[600px] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-800 text-white flex-shrink-0 p-4 rounded-l-lg">
        <h2 className="text-xl font-bold mb-6 px-2">Admin Panel</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Zarządzanie Produktami
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Zamówienia
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'stats' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Statystyki Sprzedaży
          </button>
          <button 
            onClick={() => setActiveTab('sql')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'sql' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Baza Danych (SQL)
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Lista Produktów</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                + Dodaj Produkt
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">ID</th>
                    <th className="p-3 border">Nazwa</th>
                    <th className="p-3 border">Kategoria</th>
                    <th className="p-3 border">Cena</th>
                    <th className="p-3 border">Stan</th>
                    <th className="p-3 border">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 border text-center">{p.id}</td>
                      <td className="p-3 border">{p.name}</td>
                      <td className="p-3 border">{p.category}</td>
                      <td className="p-3 border">{p.price} zł</td>
                      <td className="p-3 border">{p.stock} szt.</td>
                      <td className="p-3 border text-center">
                        <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-red-600 hover:text-red-800"
                        >
                            Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ostatnie Zamówienia</h3>
            {orders.length === 0 ? <p>Brak zamówień.</p> : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="border rounded p-4 flex justify-between items-center hover:bg-gray-50">
                            <div>
                                <p className="font-bold">{order.id}</p>
                                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                                <p className="text-sm">Klient: {order.customerEmail}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-blue-600">{order.total.toFixed(2)} zł</p>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="h-96">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Sprzedaż (Ostatnie 7 dni)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'sql' && (
          <div>
             <h3 className="text-2xl font-bold text-gray-800 mb-4">Generator Bazy Danych</h3>
             <p className="mb-2 text-gray-600">Skrypt SQL generowany dynamicznie na podstawie aktualnego stanu aplikacji:</p>
             <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm font-mono h-96">
                {generateSQL()}
             </pre>
          </div>
        )}
      </div>
    </div>
  );
};