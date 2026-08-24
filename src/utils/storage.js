export const TASKS_STORAGE_KEY = 'kanban_tasks';
export const CATEGORIES_STORAGE_KEY = 'kanban_categories';

export const defaultCategories = ['Frontend', 'Backend', 'Design'];

export const sampleTasks = [
  {
    id: 'task-1',
    title: 'Create Login UI',
    description: 'Finish login page layout and form states.',
    category: 'Frontend',
    startDate: '2026-07-10',
    dueDate: '2026-07-15',
    completeDate: '',
    responsiblePersonId: 2,
    status: 'TODO'
  },
  {
    id: 'task-2',
    title: 'Prepare Dashboard Charts',
    description: 'Display task status and category summaries.',
    category: 'Frontend',
    startDate: '2026-07-12',
    dueDate: '2026-07-20',
    completeDate: '',
    responsiblePersonId: 1,
    status: 'DOING'
  },
  {
    id: 'task-3',
    title: 'Write Test Plan',
    description: 'List important manual checks for the assignment demo.',
    category: 'Testing',
    startDate: '2026-07-08',
    dueDate: '2026-07-12',
    completeDate: '2026-07-12',
    responsiblePersonId: 3,
    status: 'DONE'
  }
];

export function readStorageValue(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return fallbackValue;
    }

    const parsedValue = JSON.parse(storedValue);

    if (Array.isArray(fallbackValue) && !Array.isArray(parsedValue)) {
      return fallbackValue;
    }

    return parsedValue;
  } catch {
    return fallbackValue;
  }
}

export function writeStorageValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
