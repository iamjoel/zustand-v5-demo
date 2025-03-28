import { create } from 'zustand';
import { produce } from 'immer';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface BasicStore {
  counter: number;
  todos: TodoItem[];
  nested: {
    value: string;
    deep: {
      count: number;
    };
  };
  increment: () => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  updateNestedRegular: (value: string) => void;
  updateNestedImmer: (value: string) => void;
}

export const useBasicStore = create<BasicStore>((set) => ({
  counter: 0,
  todos: [],
  nested: {
    value: 'initial',
    deep: {
      count: 0,
    },
  },
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  // Regular nested update
  updateNestedRegular: (value) =>
    set((state) => ({
      nested: {
        ...state.nested,
        value,
        deep: {
          ...state.nested.deep,
          count: state.nested.deep.count + 1,
        },
      },
    })),
  // Immer-powered nested update
  updateNestedImmer: (value) =>
    set(
      produce((state) => {
        state.nested.value = value;
        state.nested.deep.count += 1;
      })
    ),
}));