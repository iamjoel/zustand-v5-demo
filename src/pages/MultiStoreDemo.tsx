import React from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import {
  useCounterStoreA,
  useCounterStoreB,
  ThemeStoreContext,
  createThemeStore,
  useThemeStore,
} from '../stores/multiStore';

const storeFactoryCode = `
// Store factory pattern
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

// Create multiple instances
export const useCounterStoreA = createCounterStore(0);
export const useCounterStoreB = createCounterStore(10);`;

const contextIntegrationCode = `
// Context integration with Zustand
type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const createThemeStore = () =>
  create<ThemeStore>((set) => ({
    isDark: false,
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  }));

export const ThemeStoreContext = createContext<ReturnType<
  typeof createThemeStore
> | null>(null);

export const useThemeStore = () => {
  const store = useContext(ThemeStoreContext);
  if (!store) throw new Error('Missing ThemeStoreContext.Provider in the tree');
  return store;
};`;

function CounterA() {
  const { t } = useTranslation();
  const { count, increment, decrement } = useCounterStoreA();
  return (
    <div className="space-y-2">
      <h4 className="font-medium">{t('demos.multiStore.factory.counterA')}</h4>
      <div className="flex items-center space-x-2">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {t('demos.multiStore.factory.decrement')}
        </button>
        <span className="text-xl w-8 text-center">{count}</span>
        <button
          onClick={increment}
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {t('demos.multiStore.factory.increment')}
        </button>
      </div>
    </div>
  );
}

function CounterB() {
  const { t } = useTranslation();
  const { count, increment, decrement } = useCounterStoreB();
  return (
    <div className="space-y-2">
      <h4 className="font-medium">{t('demos.multiStore.factory.counterB')}</h4>
      <div className="flex items-center space-x-2">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {t('demos.multiStore.factory.decrement')}
        </button>
        <span className="text-xl w-8 text-center">{count}</span>
        <button
          onClick={increment}
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {t('demos.multiStore.factory.increment')}
        </button>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { t } = useTranslation();
  const store = useThemeStore();
  const { isDark, toggleTheme } = store();

  return (
    <div className="space-y-2">
      <h4 className="font-medium">{t('demos.multiStore.context.themeToggle')}</h4>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-md ${
          isDark
            ? 'bg-gray-800 text-white hover:bg-gray-900'
            : 'bg-yellow-400 text-black hover:bg-yellow-500'
        }`}
      >
        {isDark ? t('demos.multiStore.context.dark') : t('demos.multiStore.context.light')}
      </button>
    </div>
  );
}

export function MultiStoreDemo() {
  const { t } = useTranslation();
  const themeStore = React.useMemo(() => createThemeStore(), []);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {t('demos.multiStore.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('demos.multiStore.description')}
        </p>
      </div>

      {/* Store Factory Pattern Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold">
            {t('demos.multiStore.factory.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('demos.multiStore.factory.description')}
          </p>
          <CounterA />
          <CounterB />
        </div>
        <CodeBlock code={storeFactoryCode} />
      </div>

      {/* Context Integration Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-6">
            {t('demos.multiStore.context.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('demos.multiStore.context.description')}
          </p>
          <ThemeStoreContext.Provider value={themeStore}>
            <ThemeToggle />
          </ThemeStoreContext.Provider>
        </div>
        <CodeBlock code={contextIntegrationCode} />
      </div>
    </div>
  );
}