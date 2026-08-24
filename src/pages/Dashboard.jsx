import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import SummaryCard from '../components/SummaryCard.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';
import {
  CATEGORIES_STORAGE_KEY,
  TASKS_STORAGE_KEY,
  defaultCategories,
  sampleTasks
} from '../utils/storage.js';
import {
  countByCategory,
  countByStatus,
  getCompletionPerformance,
  getSummary
} from '../utils/dashboardUtils.js';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const panelClasses = 'rounded-lg border border-slate-200 bg-white shadow-soft';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        usePointStyle: true
      }
    }
  }
};

export default function Dashboard() {
  const [tasks] = useLocalStorage(TASKS_STORAGE_KEY, sampleTasks);
  const [categories] = useLocalStorage(
    CATEGORIES_STORAGE_KEY,
    defaultCategories
  );
  const summary = getSummary(tasks);
  const categoryCounts = countByCategory(tasks, categories);
  const completion = getCompletionPerformance(tasks);

  const statusData = {
    labels: ['TO DO', 'DOING', 'DONE'],
    datasets: [
      {
        data: countByStatus(tasks),
        backgroundColor: ['#0ea5e9', '#f59e0b', '#10b981'],
        borderColor: '#ffffff',
        borderWidth: 3
      }
    ]
  };

  const categoryData = {
    labels: categoryCounts.labels,
    datasets: [
      {
        label: 'Tasks',
        data: categoryCounts.values,
        backgroundColor: '#0f766e',
        borderRadius: 6
      }
    ]
  };

  const completionData = {
    labels: ['Early', 'On Time', 'Late'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [completion.early, completion.onTime, completion.late],
        backgroundColor: ['#22c55e', '#2563eb', '#e11d48'],
        borderRadius: 6
      }
    ]
  };

  return (
    <div className='space-y-6'>
      <section>
        <h2 className='text-2xl font-bold text-slate-950'>Dashboard</h2>
        <p className='mt-1 text-sm text-slate-600'>
          Task progress and performance from Local Storage data.
        </p>
      </section>

      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
        <SummaryCard label='Total Tasks' value={summary.total} />
        <SummaryCard label='TO DO Tasks' value={summary.todo} tone='sky' />
        <SummaryCard label='DOING Tasks' value={summary.doing} tone='amber' />
        <SummaryCard label='DONE Tasks' value={summary.done} tone='emerald' />
        <SummaryCard
          label='Overdue Tasks'
          value={summary.overdue}
          tone='rose'
        />
      </section>

      <section className='grid gap-4 lg:grid-cols-2'>
        <article className={`${panelClasses} p-4`}>
          <h3 className='text-base font-bold text-slate-950'>Task Status</h3>
          <div className='mt-4 h-80'>
            <Doughnut data={statusData} options={chartOptions} />
          </div>
        </article>

        <article className={`${panelClasses} p-4`}>
          <h3 className='text-base font-bold text-slate-950'>
            Task Categories
          </h3>
          <div className='mt-4 h-80'>
            <Bar data={categoryData} options={chartOptions} />
          </div>
        </article>

        <article className={`${panelClasses} p-4 lg:col-span-2`}>
          <h3 className='text-base font-bold text-slate-950'>
            Completion Performance
          </h3>
          <div className='mt-4 h-80'>
            <Bar data={completionData} options={chartOptions} />
          </div>
        </article>
      </section>
    </div>
  );
}
