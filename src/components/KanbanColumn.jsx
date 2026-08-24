import TaskCard from './TaskCard.jsx';
import { sortByDueDate } from '../utils/taskUtils.js';

export default function KanbanColumn({
  column,
  tasks,
  onEdit,
  onDelete,
  onMove
}) {
  return (
    <section
      className={`flex min-h-[28rem] flex-col rounded-lg border border-t-4 bg-slate-100 ${column.accent}`}
    >
      <header className='flex items-center justify-between border-b border-slate-200 px-4 py-3'>
        <h2 className='text-sm font-bold tracking-wide text-slate-800'>
          {column.title}
        </h2>
        <span className='rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700'>
          {tasks.length}
        </span>
      </header>
      <div className='flex flex-1 flex-col gap-3 p-3'>
        {sortByDueDate(tasks).length > 0 ? (
          sortByDueDate(tasks).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        ) : (
          <div className='flex min-h-32 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-500'>
            No tasks in this column.
          </div>
        )}
      </div>
    </section>
  );
}
