import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';
import { useStore } from '../stores/sliceStore';
import { Plus, Trash2, CheckCircle, Circle, LogOut } from 'lucide-react';

const sliceCode = `
// Example of the User slice implementation
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
      // API call simulation
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
});`;

function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-3 rounded-md">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('demos.slices.user.email')}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('demos.slices.user.password')}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? t('demos.slices.user.loggingIn') : t('demos.slices.user.login')}
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('demos.slices.user.hint')}
      </p>
    </form>
  );
}

function ProjectSection() {
  const { t } = useTranslation();
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const {
    projects,
    selectedProject,
    addProject,
    removeProject,
    selectProject,
    getProjectStats
  } = useStore();

  const stats = getProjectStats();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('demos.slices.projects.title')}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t('demos.slices.projects.total')}: {stats.totalProjects}
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          placeholder={t('demos.slices.projects.namePlaceholder')}
          className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          placeholder={t('demos.slices.projects.descriptionPlaceholder')}
          className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={() => {
            if (newProject.name) {
              addProject(newProject.name, newProject.description);
              setNewProject({ name: '', description: '' });
            }
          }}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('demos.slices.projects.add')}
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-4 rounded-md border ${
              selectedProject === project.id
                ? 'border-indigo-500 dark:border-indigo-400'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className="flex-1 cursor-pointer"
                onClick={() => selectProject(project.id)}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {project.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskSection() {
  const { t } = useTranslation();
  const [newTask, setNewTask] = useState('');
  const {
    selectedProject,
    getProjectTasks,
    addTask,
    toggleTask,
    removeTask,
    getTaskStats
  } = useStore();

  const tasks = selectedProject ? getProjectTasks(selectedProject) : [];
  const stats = getTaskStats();

  if (!selectedProject) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        {t('demos.slices.tasks.selectProject')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('demos.slices.tasks.title')}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t('demos.slices.tasks.completed')}: {stats.completed}/{stats.total}
        </div>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={t('demos.slices.tasks.newTaskPlaceholder')}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={() => {
            if (newTask.trim() && selectedProject) {
              addTask(selectedProject, newTask);
              setNewTask('');
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`${
                  task.completed
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <span
                className={`${
                  task.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SlicesDemo() {
  const { t } = useTranslation();
  const { user, logout } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('demos.slices.title')}
          </h2>
          {user && (
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('demos.slices.user.logout')}
            </button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {t('demos.slices.description')}
        </p>
      </div>

      {user ? (
        <div className="grid grid-cols-2 gap-8">
          <ProjectSection />
          <TaskSection />
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('demos.slices.codeExample')}
        </h3>
        <CodeBlock code={sliceCode} />
      </div>
    </div>
  );
}