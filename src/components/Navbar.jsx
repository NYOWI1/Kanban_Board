import { NavLink } from 'react-router-dom';
import { FaChartPie, FaColumns } from 'react-icons/fa';

const links = [
  { to: '/board', label: 'Kanban Board', icon: FaColumns },
  { to: '/dashboard', label: 'Dashboard', icon: FaChartPie }
];

const baseButtonClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';

export default function Navbar() {
  return (
    <header className='border-b border-slate-200 bg-white'>
      <nav className='mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-teal-700'>
            Project 1
          </p>
          <h1 className='text-xl font-bold text-slate-950'>Kanban Board</h1>
        </div>
        <div className='flex gap-2'>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${baseButtonClasses} ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`
              }
            >
              <Icon aria-hidden='true' />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
