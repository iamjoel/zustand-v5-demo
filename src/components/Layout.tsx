import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Layers, Database, Puzzle, Zap, Sun, Moon, Menu, X } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';

const demos = [
  { path: '/basic', icon: BookOpen, key: 'basic' },
  { path: '/multi-store', icon: Layers, key: 'multiStore' },
  { path: '/persistence', icon: Database, key: 'persistence' },
  { path: '/slices', icon: Puzzle, key: 'slices' },
  { path: '/performance', icon: Zap, key: 'performance' },
];

export function Layout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useSettingsStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                  Zustand Demo
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md text-sm"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    theme === 'light'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex justify-center p-2">
                <select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md text-sm"
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div className="flex justify-center space-x-2 p-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md ${
                    theme === 'light'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  {t('settings.themes.light')}
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  {t('settings.themes.dark')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3">
            <nav className="space-y-1">
              {demos.map(({ path, icon: Icon, key }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-md
                    ${location.pathname === path
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="md:col-span-9">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}