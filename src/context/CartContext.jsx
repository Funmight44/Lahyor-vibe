import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'lahyor-ventures-cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const normalizedQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          imgpath: product.imgpath,
          quantity: normalizedQuantity,
          inStock: product.inStock,
        },
      ];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        const nextQuantity = Number(newQuantity);

        if (nextQuantity <= 0) {
          return [];
        }

        return [{ ...item, quantity: nextQuantity }];
      }),
    );
  };

  const removeProduct = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeProduct,
    }),
    [cart, cartCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }

  return context;
}
