import { create } from 'zustand';
import { createContext, useContext } from 'react';

// Store factory
const createCounterStore = (initialValue: number) => {
  return create<{
    count: number;
    increment: () => void;
    decrement: () => void;
  }>((set) => ({
    count: initialValue,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));
};

// Create multiple store instances
export const useCounterStoreA = createCounterStore(0);
export const useCounterStoreB = createCounterStore(10);

// Context integration
type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const createThemeStore = () =>
  create<ThemeStore>((set) => ({
    isDark: false,
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  }));

export const ThemeStoreContext = createContext<ReturnType<typeof createThemeStore> | null>(null);

export const useThemeStore = () => {
  const store = useContext(ThemeStoreContext);
  if (!store) throw new Error('Missing ThemeStoreContext.Provider in the tree');
  return store;
};