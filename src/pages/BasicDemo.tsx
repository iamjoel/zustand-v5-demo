import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { useBasicStore } from '../stores/basicStore';

const counterCode = `
// Simple counter implementation
const useStore = create<{
  counter: number;
  increment: () => void;
}>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ 
    counter: state.counter + 1 
  })),
}));`;

const todoCode = `
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const useStore = create<{
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
}>((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }],
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
}));`;

const nestedCode = `
interface NestedState {
  nested: {
    value: string;
    deep: { count: number; }
  };
  updateNestedRegular: (value: string) => void;
  updateNestedImmer: (value: string) => void;
}

const useStore = create<NestedState>((set) => ({
  nested: {
    value: 'initial',
    deep: { count: 0 }
  },
  // Regular nested update
  updateNestedRegular: (value) => set((state) => ({
    nested: {
      ...state.nested,
      value,
      deep: {
        ...state.nested.deep,
        count: state.nested.deep.count + 1
      }
    }
  })),
  // Immer-powered nested update
  updateNestedImmer: (value) => set(
    produce((state) => {
      state.nested.value = value;
      state.nested.deep.count += 1;
    })
  )
}));`;

export function BasicDemo() {
  const { t } = useTranslation();
  const [newTodo, setNewTodo] = useState('');
  const store = useBasicStore();

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {t('demos.basic.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('demos.basic.description')}
        </p>
      </div>

      {/* Simple Counter Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {t('demos.basic.counter.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('demos.basic.counter.description')}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{store.counter}</span>
            <button
              onClick={store.increment}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('demos.basic.counter.increment')}
            </button>
          </div>
        </div>
        <CodeBlock code={counterCode} />
      </div>

      {/* Todo List Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {t('demos.basic.todoList.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('demos.basic.todoList.description')}
          </p>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 px-3 py-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder={t('demos.basic.todoList.addTodo')}
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
                {t('demos.basic.todoList.add')}
              </button>
            </div>
            <ul className="space-y-2">
              {store.todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => store.toggleTodo(todo.id)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CodeBlock code={todoCode} />
      </div>

      {/* Nested State Updates Section */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {t('demos.basic.nestedState.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('demos.basic.nestedState.description')}
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {t('demos.basic.nestedState.currentValue')}: {store.nested.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {t('demos.basic.nestedState.deepCount')}: {store.nested.deep.count}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => store.updateNestedRegular('updated-regular')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t('demos.basic.nestedState.updateRegular')}
              </button>
              <button
                onClick={() => store.updateNestedImmer('updated-immer')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {t('demos.basic.nestedState.updateImmer')}
              </button>
            </div>
          </div>
        </div>
        <CodeBlock code={nestedCode} />
      </div>
    </div>
  );
}