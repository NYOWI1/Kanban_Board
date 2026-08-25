import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';
import { persons } from '../data/persons.js';
import { STATUSES, getPersonName } from '../utils/taskUtils.js';

const baseButtonClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';
const secondaryButtonClasses = `${baseButtonClasses} border border-slate-300 bg-white text-slate-800 hover:bg-slate-100`;
const dangerButtonClasses = `${baseButtonClasses} bg-rose-600 text-white hover:bg-rose-700`;
const primaryButtonClasses = `${baseButtonClasses} bg-teal-700 text-white hover:bg-teal-800`;

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const canMoveBackward = task.status !== STATUSES.TODO;
  const canMoveForward = task.status !== STATUSES.DONE;
  const isOverdue =
    task.dueDate &&
    new Date().toISOString().slice(0, 10) > task.dueDate &&
    task.status !== STATUSES.DONE;

  return (
    <article className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <h3 className='break-words text-base font-semibold text-slate-950'>
            {task.title}
          </h3>
          <p className='mt-1 break-words text-sm leading-6 text-slate-600'>
            {task.description}
          </p>
        </div>
        <div className='flex shrink-0 gap-1'>
          <button
            className={`${secondaryButtonClasses} p-2`}
            type='button'
            onClick={() => onEdit(task)}
            title='Edit task'
          >
            <FaEdit aria-hidden='true' />
          </button>
          <button
            className={`${dangerButtonClasses} p-2`}
            type='button'
            onClick={() => onDelete(task.id)}
            title='Delete task'
          >
            <FaTrash aria-hidden='true' />
          </button>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2 text-xs font-medium'>
        <span className='rounded-md bg-teal-50 px-2 py-1 text-teal-800'>
          {task.category || 'No category'}
        </span>
        <span className='rounded-md bg-slate-100 px-2 py-1 text-slate-700'>
          {getPersonName(persons, task.responsiblePersonId)}
        </span>
        {isOverdue && (
          <span className='rounded-md bg-rose-50 px-2 py-1 text-rose-700'>
            Overdue
          </span>
        )}
      </div>

      <dl className='mt-4 grid grid-cols-2 gap-3 text-xs'>
        <div>
          <dt className='font-semibold text-slate-500'>Start</dt>
          <dd className='mt-1 text-slate-800'>{task.startDate || '-'}</dd>
        </div>
        <div>
          <dt className='font-semibold text-slate-500'>Due</dt>
          <dd className='mt-1 text-slate-800'>{task.dueDate || '-'}</dd>
        </div>
        <div className='col-span-2'>
          <dt className='font-semibold text-slate-500'>Completed</dt>
          <dd className='mt-1 text-slate-800'>{task.completeDate || '-'}</dd>
        </div>
      </dl>

      <div className='mt-4 grid grid-cols-2 gap-2'>
        <button
          className={secondaryButtonClasses}
          type='button'
          onClick={() => onMove(task.id, 'backward')}
          disabled={!canMoveBackward}
          title='Move backward'
        >
          <FaArrowLeft aria-hidden='true' />
          <span>Back</span>
        </button>
        <button
          className={primaryButtonClasses}
          type='button'
          onClick={() => onMove(task.id, 'forward')}
          disabled={!canMoveForward}
          title='Move forward'
        >
          <span>Next</span>
          <FaArrowRight aria-hidden='true' />
        </button>
      </div>
    </article>
  );
}
