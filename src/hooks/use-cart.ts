"use client";

import { useContext } from 'react';
import { CartContext, type CartContextType } from '@/context/CartProvider';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
