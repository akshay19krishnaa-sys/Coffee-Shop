import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 'noir-espresso',
      name: 'Noir Obsidian Espresso',
      price: 6.50,
      quantity: 2,
      milk: 'None (Pure Espresso)',
      size: 'Double Shot',
      grind: 'Espresso Fine',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
    }
  ]);
  const [selectedProductForCustomization, setSelectedProductForCustomization] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const openCustomizer = (product) => {
    setSelectedProductForCustomization(product);
  };

  const closeCustomizer = () => {
    setSelectedProductForCustomization(null);
  };

  const addToCart = (product, options = {}) => {
    const itemKey = `${product.id}-${options.milk || 'Standard'}-${options.size || 'Standard'}`;
    const effectivePrice = options.price !== undefined ? options.price : product.price;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartKey === itemKey);
      if (existing) {
        return prev.map(item =>
          item.cartKey === itemKey ? { ...item, quantity: item.quantity + (options.quantity || 1) } : item
        );
      }
      return [
        ...prev,
        {
          cartKey: itemKey,
          id: product.id,
          name: product.name,
          price: effectivePrice,
          quantity: options.quantity || 1,
          milk: options.milk || 'Oat Milk (Standard)',
          size: options.size || 'Double Shot (Standard)',
          grind: options.grind || 'Whole Bean Reserve',
          image: product.image,
        }
      ];
    });
    showToast(`Added ${product.name} to your reserve order`);
    setIsDrawerOpen(true);
  };

  const updateQuantity = (cartKey, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.cartKey === cartKey || (!item.cartKey && item.id === cartKey)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (cartKey) => {
    setCartItems(prev => prev.filter(item => (item.cartKey || item.id) !== cartKey));
    showToast('Item removed from order');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        openCustomizer,
        closeCustomizer,
        selectedProductForCustomization,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
