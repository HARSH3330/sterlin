import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          }));
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          }));
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'sterlin-cart',
    }
  )
);
