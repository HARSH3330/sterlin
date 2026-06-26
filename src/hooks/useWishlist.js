import { create } from 'zustand';

const LOCAL_WISHLIST_KEY = 'sterlin-wishlist';

function readLocalWishlist() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeLocalWishlist(items) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(items));
}

export const useWishlist = create((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/wishlist');
      if (res.ok) {
        const data = await res.json();
        const localItems = readLocalWishlist();
        const merged = [...data, ...localItems.filter((localItem) => !data.some((item) => item.id === localItem.id))];
        set({ items: merged });
      } else {
        set({ items: readLocalWishlist() });
      }
    } catch {
      set({ items: readLocalWishlist() });
    } finally {
      set({ loading: false });
    }
  },

  toggleWishlist: async (product) => {
    const isWishlisted = get().items.some(item => item.id === product.id);
    
    if (isWishlisted) {
      const nextItems = get().items.filter(item => item.id !== product.id);
      set({ items: nextItems });
      writeLocalWishlist(nextItems);

      try {
        await fetch(`/api/wishlist?productId=${product.id}`, { method: 'DELETE' });
      } catch {}
    } else {
      const nextItems = [...get().items, product];
      set({ items: nextItems });
      writeLocalWishlist(nextItems);

      try {
        const res = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, product })
        });

        if (res.status === 401) return;
        if (!res.ok && res.status !== 409) throw new Error('Wishlist API failed');
      } catch {
        writeLocalWishlist(get().items);
      }
    }
  }
}));
