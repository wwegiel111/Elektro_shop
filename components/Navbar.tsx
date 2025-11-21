import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCartIcon, UserIcon, LogOutIcon, DatabaseIcon, MenuIcon } from './Icons';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const { cart, user, logout, setView, view } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView('store')}>
            <div className="flex-shrink-0 font-bold text-2xl tracking-wider text-blue-400">
              ELEKTRO<span className="text-white">SHOP</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => setView('store')} 
                className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'store' ? 'bg-slate-800 text-blue-400' : 'hover:bg-slate-700'}`}
              >
                Sklep
              </button>
              
              {user && user.role === UserRole.ADMIN && (
                <button 
                  onClick={() => setView('admin')} 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${view === 'admin' ? 'bg-slate-800 text-red-400' : 'hover:bg-slate-700'}`}
                >
                  <DatabaseIcon className="w-4 h-4 mr-2" />
                  Panel Admina
                </button>
              )}

              {user && user.role === UserRole.CLIENT && (
                <button 
                  onClick={() => setView('profile')} 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'profile' ? 'bg-slate-800 text-blue-400' : 'hover:bg-slate-700'}`}
                >
                  Moje Konto
                </button>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div 
              className="relative cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => setView('cart')}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">Witaj, <span className="font-bold text-white">{user.username}</span></span>
                <button 
                  onClick={logout}
                  className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                  title="Wyloguj"
                >
                  <LogOutIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span>Zaloguj</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button 
                onClick={() => { setView('store'); setIsMenuOpen(false); }} 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                Sklep
              </button>
              <button 
                onClick={() => { setView('cart'); setIsMenuOpen(false); }} 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                Koszyk ({cartCount})
              </button>
               {user && user.role === UserRole.ADMIN && (
                <button 
                  onClick={() => { setView('admin'); setIsMenuOpen(false); }} 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-slate-700"
                >
                  Panel Admina
                </button>
              )}
              {user ? (
                 <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }} 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-700"
                >
                  Wyloguj
                </button>
              ) : (
                 <button 
                  onClick={() => { onOpenLogin(); setIsMenuOpen(false); }} 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-400 hover:bg-slate-700"
                >
                  Zaloguj
                </button>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};