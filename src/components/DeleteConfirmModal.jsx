import { FaTimes, FaTrash } from 'react-icons/fa';

const baseButtonClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';
const dangerButtonClasses = `${baseButtonClasses} bg-rose-600 text-white hover:bg-rose-700`;
const secondaryButtonClasses = `${baseButtonClasses} border border-slate-300 bg-white text-slate-800 hover:bg-slate-100`;

export default function DeleteConfirmModal({ task, onCancel, onConfirm }) {
  if (!task) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4'>
      <section className='w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-soft'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h2 className='text-lg font-bold text-slate-950'>Delete task</h2>
            <p className='mt-2 text-sm leading-6 text-slate-600'>
              Are you sure you want to delete{' '}
              <span className='font-semibold text-slate-950'>{task.title}</span>
              ? This action cannot be undone.
            </p>
          </div>
          <button
            className={`${secondaryButtonClasses} p-2`}
            type='button'
            onClick={onCancel}
            title='Close'
          >
            <FaTimes aria-hidden='true' />
          </button>
        </div>

        <div className='mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <button
            className={secondaryButtonClasses}
            type='button'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={dangerButtonClasses}
            type='button'
            onClick={onConfirm}
          >
            <FaTrash aria-hidden='true' />
            <span>Delete</span>
          </button>
        </div>
      </section>
    </div>
  );
}
