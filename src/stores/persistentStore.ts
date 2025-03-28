import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Settings {
  theme: 'light' | 'dark';
  fontSize: number;
  notifications: boolean;
}

interface PersistentStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

// localStorage persistence
export const useLocalStore = create(
  persist<PersistentStore>(
    (set) => ({
      settings: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// URL hash persistence
const hashStorage = {
  getItem: () => {
    try {
      const hash = window.location.hash.slice(1);
      return hash ? Promise.resolve(hash) : Promise.resolve(null);
    } catch (err) {
      return Promise.resolve(null);
    }
  },
  setItem: (_: string, value: string) => {
    window.location.hash = value;
    return Promise.resolve();
  },
  removeItem: () => {
    window.location.hash = '';
    return Promise.resolve();
  },
};

interface HashStore {
  currentTab: string;
  setTab: (tab: string) => void;
}

export const useHashStore = create(
  persist<HashStore>(
    (set) => ({
      currentTab: 'home',
      setTab: (tab) => set({ currentTab: tab }),
    }),
    {
      name: 'hash-storage',
      storage: createJSONStorage(() => hashStorage),
    }
  )
);