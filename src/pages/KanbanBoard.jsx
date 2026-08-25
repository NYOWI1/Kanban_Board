import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';
import KanbanColumn from '../components/KanbanColumn.jsx';
import TaskForm from '../components/TaskForm.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import {
  CATEGORIES_STORAGE_KEY,
  TASKS_STORAGE_KEY,
  defaultCategories,
  sampleTasks
} from '../utils/storage.js';
import {
  STATUS_COLUMNS,
  createTaskId,
  moveTaskToStatus
} from '../utils/taskUtils.js';
import { useRef, useState } from 'react';

const statusOrder = STATUS_COLUMNS.map((column) => column.id);

export default function KanbanBoard() {
  const [tasks, setTasks] = useLocalStorage(TASKS_STORAGE_KEY, sampleTasks);
  const [categories, setCategories] = useLocalStorage(
    CATEGORIES_STORAGE_KEY,
    defaultCategories
  );
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const taskFormRef = useRef(null);

  function saveCategory(category) {
    if (!category) return;
    setCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories
        : [...currentCategories, category].sort()
    );
  }

  function handleSubmit(taskData) {
    saveCategory(taskData.category);

    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? { ...taskData, id: editingTask.id }
            : task
        )
      );
      setEditingTask(null);
      return;
    }

    setTasks((currentTasks) => [
      { ...taskData, id: createTaskId() },
      ...currentTasks
    ]);
  }

  function handleDelete(taskId) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    setTaskToDelete(task);
  }

  function confirmDelete() {
    if (!taskToDelete) return;

    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== taskToDelete.id)
    );
    if (editingTask?.id === taskToDelete.id) {
      setEditingTask(null);
    }
    setTaskToDelete(null);
  }

  function handleMove(taskId, direction) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task;

        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex =
          direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
        const nextStatus = statusOrder[nextIndex];

        return nextStatus ? moveTaskToStatus(task, nextStatus) : task;
      })
    );
  }

  function handleEdit(task) {
    setEditingTask(task);
    window.requestAnimationFrame(() => {
      taskFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  return (
    <div className='space-y-6'>
      <div ref={taskFormRef}>
        <TaskForm
          task={editingTask}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setEditingTask(null)}
        />
      </div>

      <section className='grid gap-4 lg:grid-cols-3'>
        {STATUS_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ))}
      </section>

      <DeleteConfirmModal
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
