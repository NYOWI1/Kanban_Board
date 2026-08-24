import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import KanbanBoard from './pages/KanbanBoard.jsx';

export default function App() {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-950'>
      <Navbar />
      <main className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <Routes>
          <Route path='/' element={<Navigate to='/board' replace />} />
          <Route path='/board' element={<KanbanBoard />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}
