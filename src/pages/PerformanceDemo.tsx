import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import {
  usePerformanceStore,
  useTodoStats,
  useTodoIds,
} from '../stores/performanceStore';

const storeCode = `
interface PerformanceStore {
  todos: Todo[];
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  updateStats: () => void;
}

export const usePerformanceStore = create<PerformanceStore>((set, get) => ({
  todos: [],
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
  },
  addTodo: (text) =>
    set((state) => {
      const newTodos = [...state.todos, { id: Date.now(), text, completed: false }];
      return { todos: newTodos };
    }),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  updateStats: () =>
    set((state) => ({
      stats: {
        total: state.todos.length,
        completed: state.todos.filter((t) => t.completed).length,
        pending: state.todos.filter((t) => !t.completed).length,
      },
    })),
}));`;

const selectorsCode = `
// Selector examples with performance optimizations
export const useTodoStats = () =>
  usePerformanceStore((state) => state.stats, shallow);

export const useTodoIds = () =>
  usePerformanceStore((state) => state.todos.map(t => t.id));`;

function TodoStats() {
  const { t } = useTranslation();
  const stats = useTodoStats();
  const renderCount = React.useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div className="space-y-2">
      <h4 className="font-medium">{t('demos.performance.optimizations.stats.title')}</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-white dark:bg-gray-700 rounded-md text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('demos.performance.optimizations.stats.total')}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-700 rounded-md text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('demos.performance.optimizations.stats.completed')}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.completed}</p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-700 rounded-md text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('demos.performance.optimizations.stats.pending')}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{stats.pending}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('demos.performance.optimizations.stats.renders')} {renderCount.current}
      </p>
    </div>
  );
}

function TodoIds() {
  const { t } = useTranslation();
  const ids = useTodoIds();
  const renderCount = React.useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <h4 className="font-medium mb-2">{t('demos.performance.optimizations.ids.title')}</h4>
      <div className="bg-white dark:bg-gray-700 p-3 rounded-md">
        <p className="text-sm font-mono text-gray-900 dark:text-white">[{ids.join(', ')}]</p>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {t('demos.performance.optimizations.ids.renders')} {renderCount.current}
      </p>
    </div>
  );
}

export function PerformanceDemo() {
  const { t } = useTranslation();
  const [newTodo, setNewTodo] = useState('');
  const store = usePerformanceStore();

  useEffect(() => {
    store.updateStats();
  }, [store.todos]);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {t('demos.performance.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('demos.performance.description')}
        </p>
      </div>

      {/* Todo Management Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold">
            {t('demos.performance.todo.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('demos.performance.todo.description')}
          </p>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 px-3 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={t('demos.performance.todo.addTodo')}
              />
              <button
                onClick={() => {
                  if (newTodo.trim()) {
                    store.addTodo(newTodo);
                    setNewTodo('');
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {t('demos.performance.todo.add')}
              </button>
            </div>

            <div className="space-y-2">
              {store.todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => store.toggleTodo(todo.id)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span
                    className={
                      todo.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-900 dark:text-white'
                    }
                  >
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CodeBlock code={storeCode} />
      </div>

      {/* Performance Optimizations Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold">
            {t('demos.performance.optimizations.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('demos.performance.optimizations.description')}
          </p>
          <TodoStats />
          <TodoIds />
        </div>
        <CodeBlock code={selectorsCode} />
      </div>
    </div>
  );
}