export default {
  translation: {
    nav: {
      home: 'Home',
      basic: 'Basic State Management',
      multiStore: 'Multiple Stores',
      persistence: 'State Persistence',
      slices: 'Slice Pattern',
      performance: 'Performance Optimization',
    },
    home: {
      title: 'Zustand Feature Demos',
      subtitle: 'Explore the powerful features of Zustand through interactive examples and detailed explanations.',
      features: {
        basic: {
          title: 'Basic State Management',
          description: 'Learn the fundamentals of Zustand state management including state updates and nested objects.',
        },
        multiStore: {
          title: 'Multiple Stores',
          description: 'Explore how to manage multiple store instances and integrate with React Context.',
        },
        persistence: {
          title: 'State Persistence',
          description: 'Implement state persistence using localStorage, URL hash, and custom storage solutions.',
        },
        slices: {
          title: 'Slice Pattern',
          description: 'Organize your state using the slice pattern for better code organization and maintainability.',
        },
        performance: {
          title: 'Performance Optimization',
          description: 'Learn advanced techniques for optimizing performance with selectors and shallow comparisons.',
        },
      },
    },
    demos: {
      basic: {
        title: 'Basic State Management',
        description: 'Learn the fundamentals of Zustand state management through practical examples.',
        counter: {
          title: 'Simple Counter',
          description: 'Demonstrates basic state management with a simple counter. Shows how to create a store, update state, and subscribe to changes.',
          increment: 'Increment',
          value: 'Counter value',
        },
        todoList: {
          title: 'Todo List',
          description: 'Shows how to manage arrays and complex state updates. Includes adding items, toggling completion status, and maintaining immutability.',
          addTodo: 'Add new todo',
          add: 'Add',
        },
        nestedState: {
          title: 'Nested State Updates',
          description: 'Compares different approaches to updating nested state: traditional spread operator vs Immer-powered updates.',
          currentValue: 'Current Value',
          deepCount: 'Deep Count',
          updateRegular: 'Update Regular',
          updateImmer: 'Update Immer',
        },
      },
      multiStore: {
        title: 'Multiple Stores',
        description: 'Explore how to manage multiple store instances and integrate with React Context.',
        factory: {
          title: 'Store Factory Pattern',
          description: 'Demonstrates how to create multiple store instances from a single factory function.',
          counterA: 'Counter A (starts at 0)',
          counterB: 'Counter B (starts at 10)',
          increment: 'Increment',
          decrement: 'Decrement',
        },
        context: {
          title: 'Context Integration',
          description: 'Shows how to integrate Zustand stores with React Context.',
          themeToggle: 'Theme Toggle',
          light: 'Light',
          dark: 'Dark',
        },
      },
      persistence: {
        title: 'State Persistence',
        description: 'Learn how to persist Zustand state using different storage methods.',
        localStorage: {
          title: 'localStorage Persistence',
          description: 'Demonstrates how to persist state in localStorage using Zustand\'s persist middleware.',
          theme: 'Theme',
          fontSize: 'Font Size',
          notifications: 'Notifications',
          light: 'Light',
          dark: 'Dark',
        },
        urlHash: {
          title: 'URL Hash Persistence',
          description: 'Shows how to implement custom storage persistence using URL hash.',
          currentTab: 'Current tab is persisted in URL hash:',
        },
      },
      performance: {
        title: 'Performance Optimization',
        description: 'Learn advanced techniques for optimizing performance with selectors and shallow comparisons.',
        todo: {
          title: 'Todo Management',
          description: 'Demonstrates the base functionality that we\'ll optimize.',
          addTodo: 'Add new todo',
          add: 'Add',
        },
        optimizations: {
          title: 'Performance Optimizations',
          description: 'Shows how to use selectors and shallow comparisons to minimize re-renders.',
          stats: {
            title: 'Todo Stats (with shallow comparison)',
            total: 'Total',
            completed: 'Completed',
            pending: 'Pending',
            renders: 'Component renders:',
          },
          ids: {
            title: 'Todo IDs (derived state)',
            renders: 'Component renders:',
          },
        },
      },
      slices: {
        title: 'Task Management System',
        description: 'A comprehensive example demonstrating the slice pattern with user authentication, projects, and tasks.',
        codeExample: 'Slice Implementation Example',
        user: {
          title: 'User Management',
          email: 'Email',
          password: 'Password',
          login: 'Login',
          loggingIn: 'Logging in...',
          logout: 'Logout',
          hint: 'Try email: admin@example.com, password: admin',
        },
        projects: {
          title: 'Projects',
          total: 'Total Projects',
          namePlaceholder: 'Project name',
          descriptionPlaceholder: 'Project description',
          add: 'Add Project',
        },
        tasks: {
          title: 'Tasks',
          selectProject: 'Select a project to manage tasks',
          completed: 'Completed',
          newTaskPlaceholder: 'New task',
          add: 'Add Task',
        },
      },
    },
  },
};