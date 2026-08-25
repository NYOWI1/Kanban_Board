import { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { persons } from '../data/persons.js';
import { STATUSES, getTodayDate } from '../utils/taskUtils.js';

const emptyForm = {
  title: '',
  description: '',
  category: '',
  newCategory: '',
  startDate: getTodayDate(),
  dueDate: '',
  completeDate: '',
  responsiblePersonId: persons[0].id,
  status: STATUSES.TODO
};

const CREATE_CATEGORY_VALUE = '__create_category__';
const panelClasses = 'rounded-lg border border-slate-200 bg-white shadow-soft';
const labelClasses = 'text-sm font-medium text-slate-700';
const inputClasses =
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100';
const errorInputClasses =
  'border-rose-400 focus:border-rose-600 focus:ring-rose-100';
const warningInputClasses =
  'border-amber-400 focus:border-amber-600 focus:ring-amber-100';
const messageClasses = 'mt-1 text-xs font-medium';
const baseButtonClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';
const primaryButtonClasses = `${baseButtonClasses} bg-teal-700 text-white hover:bg-teal-800`;
const secondaryButtonClasses = `${baseButtonClasses} border border-slate-300 bg-white text-slate-800 hover:bg-slate-100`;

export default function TaskForm({ task, categories, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(task ? { ...emptyForm, ...task, newCategory: '' } : emptyForm);
    setIsCreatingCategory(false);
    setErrors({});
  }, [task]);

  const selectedCategory = useMemo(
    () =>
      formData.newCategory.trim()
        ? formData.newCategory.trim()
        : formData.category,
    [formData.category, formData.newCategory]
  );

  const warnings = useMemo(() => {
    const nextWarnings = {};
    const today = getTodayDate();

    if (
      formData.dueDate &&
      formData.dueDate < today &&
      formData.status !== STATUSES.DONE
    ) {
      nextWarnings.dueDate = 'This task is overdue.';
    }

    if (formData.status === STATUSES.DONE && !formData.completeDate) {
      nextWarnings.completeDate =
        'A complete date will be added automatically when saved.';
    }

    return nextWarnings;
  }, [formData.completeDate, formData.dueDate, formData.status]);

  function validateForm() {
    const nextErrors = {};
    const normalizedTitle = formData.title.trim();
    const normalizedCategory = selectedCategory.trim();

    if (!normalizedTitle) {
      nextErrors.title = 'Title is required.';
    }

    if (!normalizedCategory) {
      nextErrors.category = isCreatingCategory
        ? 'Enter a new category name.'
        : 'Select a category.';
    }

    if (!formData.startDate) {
      nextErrors.startDate = 'Start date is required.';
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = 'Due date is required.';
    }

    if (
      formData.startDate &&
      formData.dueDate &&
      formData.dueDate < formData.startDate
    ) {
      nextErrors.dueDate = 'Due date cannot be before the start date.';
    }

    if (
      formData.status === STATUSES.DONE &&
      formData.startDate &&
      formData.completeDate &&
      formData.completeDate < formData.startDate
    ) {
      nextErrors.completeDate =
        'Complete date cannot be before the start date.';
    }

    return nextErrors;
  }

  function getFieldClasses(field) {
    if (errors[field]) return `${inputClasses} ${errorInputClasses}`;
    if (warnings[field]) return `${inputClasses} ${warningInputClasses}`;
    return inputClasses;
  }

  function renderFieldMessage(field) {
    if (errors[field]) {
      return (
        <p className={`${messageClasses} text-rose-600`}>{errors[field]}</p>
      );
    }

    if (warnings[field]) {
      return (
        <p className={`${messageClasses} text-amber-700`}>{warnings[field]}</p>
      );
    }

    return null;
  }

  function clearFieldErrors(...fields) {
    setErrors((current) => {
      const nextErrors = { ...current };
      fields.forEach((field) => {
        delete nextErrors[field];
      });
      return nextErrors;
    });
  }

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));

    if (field === 'newCategory') {
      clearFieldErrors('category');
      return;
    }

    if (field === 'startDate') {
      clearFieldErrors('startDate', 'dueDate', 'completeDate');
      return;
    }

    if (field === 'status') {
      clearFieldErrors('completeDate');
      return;
    }

    clearFieldErrors(field);
  }

  function updateCategory(value) {
    if (value === CREATE_CATEGORY_VALUE) {
      setIsCreatingCategory(true);
      setFormData((current) => ({ ...current, category: '', newCategory: '' }));
      clearFieldErrors('category');
      return;
    }

    setIsCreatingCategory(false);
    setFormData((current) => ({
      ...current,
      category: value,
      newCategory: ''
    }));
    clearFieldErrors('category');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedTitle = formData.title.trim();
    const normalizedCategory = selectedCategory.trim();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onSubmit({
      ...formData,
      title: normalizedTitle,
      description: formData.description.trim(),
      category: normalizedCategory,
      responsiblePersonId: Number(formData.responsiblePersonId),
      completeDate:
        formData.status === STATUSES.DONE
          ? formData.completeDate || getTodayDate()
          : ''
    });

    if (!task) {
      setFormData(emptyForm);
      setIsCreatingCategory(false);
    }
  }

  return (
    <form className={`${panelClasses} p-4`} onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-lg font-bold text-slate-950'>
            {task ? 'Edit Task' : 'Create Task'}
          </h2>
          <p className='text-sm text-slate-500'>
            All task data is saved in Local Storage.
          </p>
        </div>
        {task && (
          <button
            className={secondaryButtonClasses}
            type='button'
            onClick={onCancel}
          >
            <FaTimes aria-hidden='true' />
            <span>Cancel</span>
          </button>
        )}
      </div>

      <div className='mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <label>
          <span className={labelClasses}>Title</span>
          <input
            className={getFieldClasses('title')}
            value={formData.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder='Task title'
            aria-invalid={Boolean(errors.title)}
          />
          {renderFieldMessage('title')}
        </label>

        <label>
          <span className={labelClasses}>Responsible Person</span>
          <select
            className={inputClasses}
            value={formData.responsiblePersonId}
            onChange={(event) =>
              updateField('responsiblePersonId', event.target.value)
            }
          >
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className={labelClasses}>Category</span>
          <select
            className={getFieldClasses('category')}
            value={
              isCreatingCategory ? CREATE_CATEGORY_VALUE : formData.category
            }
            onChange={(event) => updateCategory(event.target.value)}
            aria-invalid={Boolean(errors.category)}
          >
            <option value=''>Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value={CREATE_CATEGORY_VALUE}>Create a new category</option>
          </select>
          {!isCreatingCategory && renderFieldMessage('category')}
        </label>

        {isCreatingCategory ? (
          <label>
            <span className={labelClasses}>New Category</span>
            <input
              className={getFieldClasses('category')}
              value={formData.newCategory}
              onChange={(event) =>
                updateField('newCategory', event.target.value)
              }
              placeholder='Enter new category'
              aria-invalid={Boolean(errors.category)}
            />
            {renderFieldMessage('category')}
          </label>
        ) : null}

        <label className='md:col-span-2'>
          <span className={labelClasses}>Description</span>
          <textarea
            className={`${inputClasses} min-h-24 resize-y`}
            value={formData.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder='Task description'
          />
        </label>

        <label>
          <span className={labelClasses}>Start Date</span>
          <input
            className={getFieldClasses('startDate')}
            type='date'
            value={formData.startDate}
            onChange={(event) => updateField('startDate', event.target.value)}
            aria-invalid={Boolean(errors.startDate)}
          />
          {renderFieldMessage('startDate')}
        </label>

        <label>
          <span className={labelClasses}>Due Date</span>
          <input
            className={getFieldClasses('dueDate')}
            type='date'
            value={formData.dueDate}
            onChange={(event) => updateField('dueDate', event.target.value)}
            aria-invalid={Boolean(errors.dueDate)}
          />
          {renderFieldMessage('dueDate')}
        </label>

        <label>
          <span className={labelClasses}>Status</span>
          <select
            className={inputClasses}
            value={formData.status}
            onChange={(event) => updateField('status', event.target.value)}
          >
            <option value={STATUSES.TODO}>TO DO</option>
            <option value={STATUSES.DOING}>DOING</option>
            <option value={STATUSES.DONE}>DONE</option>
          </select>
        </label>

        <label>
          <span className={labelClasses}>Complete Date</span>
          <input
            className={getFieldClasses('completeDate')}
            type='date'
            value={
              formData.status === STATUSES.DONE ? formData.completeDate : ''
            }
            onChange={(event) =>
              updateField('completeDate', event.target.value)
            }
            disabled={formData.status !== STATUSES.DONE}
            aria-invalid={Boolean(errors.completeDate)}
          />
          {renderFieldMessage('completeDate')}
        </label>
      </div>

      <div className='mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end'>
        <button className={primaryButtonClasses} type='submit'>
          {task ? <FaSave aria-hidden='true' /> : <FaPlus aria-hidden='true' />}
          <span>{task ? 'Save Task' : 'Add Task'}</span>
        </button>
      </div>
    </form>
  );
}
