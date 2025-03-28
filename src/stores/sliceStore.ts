import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// User slice
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserSlice {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const createUserSlice = (set: any) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === 'admin@example.com' && password === 'admin') {
        set({
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin'
          },
          isLoading: false
        });
      } else {
        set({ error: 'Invalid credentials', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
    }
  },
  logout: () => set({ user: null, error: null }),
  updateProfile: (data) => set((state: any) => ({
    user: state.user ? { ...state.user, ...data } : null
  }))
});

// Task slice
interface Task {
  id: string;
  title: string;
  completed: boolean;
  projectId: string;
}

interface TaskSlice {
  tasks: Task[];
  isLoading: boolean;
  addTask: (projectId: string, title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  getProjectTasks: (projectId: string) => Task[];
}

const createTaskSlice = (set: any, get: any) => ({
  tasks: [],
  isLoading: false,
  addTask: (projectId: string, title: string) => set((state: any) => ({
    tasks: [...state.tasks, {
      id: Date.now().toString(),
      title,
      completed: false,
      projectId
    }]
  })),
  toggleTask: (id: string) => set((state: any) => ({
    tasks: state.tasks.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  removeTask: (id: string) => set((state: any) => ({
    tasks: state.tasks.filter((task: Task) => task.id !== id)
  })),
  getProjectTasks: (projectId: string) => {
    const state = get();
    return state.tasks.filter((task: Task) => task.projectId === projectId);
  }
});

// Project slice
interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProjectSlice {
  projects: Project[];
  selectedProject: string | null;
  addProject: (name: string, description: string) => void;
  removeProject: (id: string) => void;
  selectProject: (id: string | null) => void;
}

const createProjectSlice = (set: any) => ({
  projects: [],
  selectedProject: null,
  addProject: (name: string, description: string) => set((state: any) => ({
    projects: [...state.projects, {
      id: Date.now().toString(),
      name,
      description
    }]
  })),
  removeProject: (id: string) => set((state: any) => ({
    projects: state.projects.filter((project: Project) => project.id !== id),
    selectedProject: state.selectedProject === id ? null : state.selectedProject
  })),
  selectProject: (id: string | null) => set({ selectedProject: id })
});

// Stats slice
interface StatsSlice {
  getTaskStats: () => {
    total: number;
    completed: number;
    pending: number;
  };
  getProjectStats: () => {
    totalProjects: number;
    averageTasksPerProject: number;
  };
}

const createStatsSlice = (get: any) => ({
  getTaskStats: () => {
    const state = get();
    const total = state.tasks.length;
    const completed = state.tasks.filter((t: Task) => t.completed).length;
    return {
      total,
      completed,
      pending: total - completed
    };
  },
  getProjectStats: () => {
    const state = get();
    const totalProjects = state.projects.length;
    const averageTasksPerProject = totalProjects
      ? state.tasks.length / totalProjects
      : 0;
    return {
      totalProjects,
      averageTasksPerProject
    };
  }
});

// Combine all slices
interface CombinedStore extends UserSlice, TaskSlice, ProjectSlice, StatsSlice {}

export const useStore = create<CombinedStore>()(
  devtools(
    (...args) => ({
      ...createUserSlice(args[0]),
      ...createTaskSlice(args[0], args[1]),
      ...createProjectSlice(args[0]),
      ...createStatsSlice(args[1])
    }),
    { name: 'Task Management Store' }
  )
);