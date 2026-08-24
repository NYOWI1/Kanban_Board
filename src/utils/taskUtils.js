export const STATUSES = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
};

export const STATUS_COLUMNS = [
  { id: STATUSES.TODO, title: 'TO DO', accent: 'border-t-sky-500' },
  { id: STATUSES.DOING, title: 'DOING', accent: 'border-t-amber-500' },
  { id: STATUSES.DONE, title: 'DONE', accent: 'border-t-emerald-500' }
];

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function createTaskId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function moveTaskToStatus(task, nextStatus) {
  return {
    ...task,
    status: nextStatus,
    completeDate: nextStatus === STATUSES.DONE ? getTodayDate() : ''
  };
}

export function getPersonName(persons, personId) {
  return (
    persons.find((person) => Number(person.id) === Number(personId))?.name ||
    'Unassigned'
  );
}

export function sortByDueDate(tasks) {
  return [...tasks].sort((first, second) => {
    if (!first.dueDate && !second.dueDate)
      return first.title.localeCompare(second.title);
    if (!first.dueDate) return 1;
    if (!second.dueDate) return -1;
    return first.dueDate.localeCompare(second.dueDate);
  });
}
