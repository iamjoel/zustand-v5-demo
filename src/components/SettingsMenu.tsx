import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Sun, Moon } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';

export function SettingsMenu() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="relative group">
      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
        <div className="px-4 py-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.language')}
            </label>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md text-sm"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.theme')}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  theme === 'light'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Sun className="w-4 h-4 mr-2" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  theme === 'dark'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Moon className="w-4 h-4 mr-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}