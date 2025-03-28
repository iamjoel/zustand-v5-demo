import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Layers, Database, Puzzle, Zap } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    path: '/basic',
    key: 'basic',
  },
  {
    icon: Layers,
    path: '/multi-store',
    key: 'multiStore',
  },
  {
    icon: Database,
    path: '/persistence',
    key: 'persistence',
  },
  {
    icon: Puzzle,
    path: '/slices',
    key: 'slices',
  },
  {
    icon: Zap,
    path: '/performance',
    key: 'performance',
  },
];

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="py-8 md:py-12">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
        {features.map(({ icon: Icon, path, key }) => (
          <Link
            key={path}
            to={path}
            className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div>
              <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {t(`home.features.${key}.title`)}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {t(`home.features.${key}.description`)}
              </p>
            </div>
            <span className="absolute top-6 right-6 text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}