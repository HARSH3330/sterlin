import { create } from 'zustand';

export const useWishlist = create((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/wishlist');
      if (res.ok) {
        const data = await res.json();
        set({ items: data });
      }
    } finally {
      set({ loading: false });
    }
  },

  toggleWishlist: async (product) => {
    const isWishlisted = get().items.some(item => item.id === product.id);
    
    if (isWishlisted) {
      const res = await fetch(`/api/wishlist?productId=${product.id}`, { method: 'DELETE' });
      if (res.ok) {
        set({ items: get().items.filter(item => item.id !== product.id) });
      }
    } else {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
      if (res.ok) {
        set({ items: [...get().items, product] });
      }
    }
  }
}));
