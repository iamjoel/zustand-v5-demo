import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

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
}));

// Selector examples
export const useTodoStats = () => usePerformanceStore((state) => state.stats, shallow);
export const useTodoIds = () => usePerformanceStore((state) => state.todos.map(t => t.id));