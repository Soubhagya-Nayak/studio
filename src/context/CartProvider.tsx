"use client";

import type { Product } from '@/lib/products';
import React, { createContext, useReducer, ReactNode, useMemo } from 'react';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 1) {
        return {
            ...state,
            items: state.items.filter((item) => item.product.id !== action.payload.id)
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
      };
    }
    default:
      return state;
  }
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  itemCount: number;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const itemCount = useMemo(() => state.items.reduce((total, item) => total + item.quantity, 0), [state.items]);
  const totalPrice = useMemo(() => state.items.reduce((total, item) => total + item.product.price * item.quantity, 0), [state.items]);

  const value = {
    cart: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    itemCount,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
