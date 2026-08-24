import { STATUSES, getTodayDate } from './taskUtils.js';

export function isOverdue(task, today = getTodayDate()) {
  return Boolean(
    task.dueDate && today > task.dueDate && task.status !== STATUSES.DONE
  );
}

export function getSummary(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === STATUSES.TODO).length,
    doing: tasks.filter((task) => task.status === STATUSES.DOING).length,
    done: tasks.filter((task) => task.status === STATUSES.DONE).length,
    overdue: tasks.filter((task) => isOverdue(task)).length
  };
}

export function countByStatus(tasks) {
  return [STATUSES.TODO, STATUSES.DOING, STATUSES.DONE].map(
    (status) => tasks.filter((task) => task.status === status).length
  );
}

export function countByCategory(tasks, categories) {
  const categoryNames = Array.from(
    new Set([
      ...categories,
      ...tasks.map((task) => task.category).filter(Boolean)
    ])
  );

  return {
    labels: categoryNames,
    values: categoryNames.map(
      (category) => tasks.filter((task) => task.category === category).length
    )
  };
}

export function getCompletionPerformance(tasks) {
  const completedTasks = tasks.filter(
    (task) => task.status === STATUSES.DONE && task.completeDate && task.dueDate
  );

  return {
    early: completedTasks.filter((task) => task.completeDate < task.dueDate)
      .length,
    onTime: completedTasks.filter((task) => task.completeDate === task.dueDate)
      .length,
    late: completedTasks.filter((task) => task.completeDate > task.dueDate)
      .length
  };
}
