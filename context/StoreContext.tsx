import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, UserRole, ViewState, Order } from '../types';
import { INITIAL_PRODUCTS } from '../mockData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  view: ViewState;
  orders: Order[];
  
  // Actions
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  setView: (view: ViewState) => void;
  placeOrder: (customerEmail?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('store');
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const login = (username: string, role: UserRole) => {
    setUser({
      id: Math.floor(Math.random() * 1000),
      username,
      email: `${username}@example.com`,
      role
    });
    if (role === UserRole.ADMIN) {
      setView('admin');
    } else {
      setView('store');
    }
  };

  const logout = () => {
    setUser(null);
    setView('store');
  };

  const placeOrder = (customerEmail?: string) => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: user ? user.id : null,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'pending',
      customerEmail: user ? user.email : customerEmail
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setView('checkout-success');
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      user,
      view,
      orders,
      setProducts,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      login,
      logout,
      setView,
      placeOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};