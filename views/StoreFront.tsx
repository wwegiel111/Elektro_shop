import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../mockData';
import { Product } from '../types';
import { SearchIcon, PlusIcon } from '../components/Icons';

export const StoreFront: React.FC = () => {
  const { products, addToCart } = useStore();
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'name' | 'price_asc' | 'price_desc'>('name');

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    let res = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Wszystkie' || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    return res.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 bg-white p-6 rounded-lg shadow-sm h-fit">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategorie</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="category" 
                className="text-blue-600 focus:ring-blue-500"
                checked={selectedCategory === 'Wszystkie'}
                onChange={() => setSelectedCategory('Wszystkie')}
              />
              <span className="ml-2 text-gray-700">Wszystkie</span>
            </label>
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center">
                <input 
                  type="radio" 
                  name="category" 
                  className="text-blue-600 focus:ring-blue-500"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span className="ml-2 text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cena</h3>
          <div className="flex items-center gap-2 mb-2">
            <input 
              type="number" 
              className="w-full border rounded px-2 py-1 text-sm"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            />
            <span>-</span>
            <input 
              type="number" 
              className="w-full border rounded px-2 py-1 text-sm"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>
          <input 
            type="range" 
            min="0" 
            max="10000" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-blue-600"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-full sm:w-96">
            <input 
              type="text"
              placeholder="Szukaj produktów..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="name">Nazwa (A-Z)</option>
            <option value="price_asc">Cena: Rosnąco</option>
            <option value="price_desc">Cena: Malejąco</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">Nie znaleziono produktów spełniających kryteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="h-48 overflow-hidden relative bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  {product.isFeatured && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                      HIT
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{product.category}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? `Dostępny (${product.stock})` : 'Niedostępny'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} zł</span>
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        product.stock > 0 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Do koszyka
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};