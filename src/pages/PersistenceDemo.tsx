import React from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { useLocalStore, useHashStore } from '../stores/persistentStore';

const localStorageCode = `
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
);`;

const hashStorageCode = `
// URL hash persistence with custom storage
const hashStorage = {
  getItem: () => {
    const hash = window.location.hash.slice(1);
    return hash ? Promise.resolve(hash) : Promise.resolve(null);
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
);`;

export function PersistenceDemo() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useLocalStore();
  const { currentTab, setTab } = useHashStore();

  const tabs = ['home', 'profile', 'settings', 'about'];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {t('demos.persistence.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('demos.persistence.description')}
        </p>
      </div>

      {/* localStorage Persistence Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {t('demos.persistence.localStorage.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('demos.persistence.localStorage.description')}
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{t('demos.persistence.localStorage.theme')}</span>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' })}
                className="px-3 py-1 border dark:border-gray-600 rounded-md dark:bg-gray-700"
              >
                <option value="light">{t('demos.persistence.localStorage.light')}</option>
                <option value="dark">{t('demos.persistence.localStorage.dark')}</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span>{t('demos.persistence.localStorage.fontSize')}</span>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                className="w-32"
              />
              <span className="ml-2 w-8">{settings.fontSize}px</span>
            </div>

            <div className="flex items-center justify-between">
              <span>{t('demos.persistence.localStorage.notifications')}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSettings({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        <CodeBlock code={localStorageCode} />
      </div>

      {/* URL Hash Persistence Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {t('demos.persistence.urlHash.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('demos.persistence.urlHash.description')}
          </p>
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setTab(tab)}
                className={`px-4 py-2 rounded-md ${
                  currentTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {t('demos.persistence.urlHash.currentTab')} {currentTab}
          </p>
        </div>
        <CodeBlock code={hashStorageCode} />
      </div>
    </div>
  );
}