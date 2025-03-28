export default {
  translation: {
    nav: {
      home: '首页',
      basic: '基础状态管理',
      multiStore: '多个存储',
      persistence: '状态持久化',
      slices: '切片模式',
      performance: '性能优化',
    },
    home: {
      title: 'Zustand 功能演示',
      subtitle: '通过交互示例和详细说明探索 Zustand 的强大功能。',
      features: {
        basic: {
          title: '基础状态管理',
          description: '学习 Zustand 状态管理的基础知识，包括状态更新和嵌套对象。',
        },
        multiStore: {
          title: '多个存储',
          description: '探索如何管理多个存储实例并与 React Context 集成。',
        },
        persistence: {
          title: '状态持久化',
          description: '使用 localStorage、URL hash 和自定义存储解决方案实现状态持久化。',
        },
        slices: {
          title: '切片模式',
          description: '使用切片模式组织状态，以获得更好的代码组织和可维护性。',
        },
        performance: {
          title: '性能优化',
          description: '学习使用选择器和浅比较优化性能的高级技术。',
        },
      },
    },
    demos: {
      basic: {
        title: '基础状态管理',
        description: '通过实际示例学习 Zustand 状态管理的基础知识。',
        counter: {
          title: '简单计数器',
          description: '演示基本的状态管理，包括创建存储、更新状态和订阅变化。',
          increment: '增加',
          value: '计数器值',
        },
        todoList: {
          title: '待办事项列表',
          description: '展示如何管理数组和复杂状态更新，包括添加项目、切换完成状态和维护不可变性。',
          addTodo: '添加新待办事项',
          add: '添加',
        },
        nestedState: {
          title: '嵌套状态更新',
          description: '比较更新嵌套状态的不同方法：传统展开运算符与 Immer 驱动的更新。',
          currentValue: '当前值',
          deepCount: '深层计数',
          updateRegular: '常规更新',
          updateImmer: 'Immer 更新',
        },
      },
      multiStore: {
        title: '多个存储',
        description: '探索如何管理多个存储实例并与 React Context 集成。',
        factory: {
          title: '存储工厂模式',
          description: '演示如何从单个工厂函数创建多个存储实例。',
          counterA: '计数器 A（从 0 开始）',
          counterB: '计数器 B（从 10 开始）',
          increment: '增加',
          decrement: '减少',
        },
        context: {
          title: 'Context 集成',
          description: '展示如何将 Zustand 存储与 React Context 集成。',
          themeToggle: '主题切换',
          light: '亮色',
          dark: '暗色',
        },
      },
      persistence: {
        title: '状态持久化',
        description: '学习如何使用不同的存储方法持久化 Zustand 状态。',
        localStorage: {
          title: 'localStorage 持久化',
          description: '演示如何使用 Zustand 的 persist 中间件在 localStorage 中持久化状态。',
          theme: '主题',
          fontSize: '字体大小',
          notifications: '通知',
          light: '亮色',
          dark: '暗色',
        },
        urlHash: {
          title: 'URL Hash 持久化',
          description: '展示如何使用 URL hash 实现自定义存储持久化。',
          currentTab: '当前标签保存在 URL hash 中：',
        },
      },
      performance: {
        title: '性能优化',
        description: '学习使用选择器和浅比较优化性能的高级技术。',
        todo: {
          title: '待办事项管理',
          description: '演示我们将要优化的基本功能。',
          addTodo: '添加新待办事项',
          add: '添加',
        },
        optimizations: {
          title: '性能优化',
          description: '展示如何使用选择器和浅比较来最小化重新渲染。',
          stats: {
            title: '待办事项统计（使用浅比较）',
            total: '总计',
            completed: '已完成',
            pending: '待完成',
            renders: '组件渲染次数：',
          },
          ids: {
            title: '待办事项 ID（派生状态）',
            renders: '组件渲染次数：',
          },
        },
      },
      slices: {
        title: '任务管理系统',
        description: '一个综合示例，演示带有用户认证、项目和任务的切片模式。',
        codeExample: '切片实现示例',
        user: {
          title: '用户管理',
          email: '邮箱',
          password: '密码',
          login: '登录',
          loggingIn: '登录中...',
          logout: '退出',
          hint: '试试 邮箱: admin@example.com, 密码: admin',
        },
        projects: {
          title: '项目',
          total: '项目总数',
          namePlaceholder: '项目名称',
          descriptionPlaceholder: '项目描述',
          add: '添加项目',
        },
        tasks: {
          title: '任务',
          selectProject: '选择一个项目来管理任务',
          completed: '已完成',
          newTaskPlaceholder: '新任务',
          add: '添加任务',
        },
      },
    },
  },
};