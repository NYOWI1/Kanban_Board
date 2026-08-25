export default function SummaryCard({ label, value, tone = 'slate' }) {
  const tones = {
    slate: 'border-slate-200 bg-white text-slate-950',
    sky: 'border-sky-100 bg-sky-50 text-sky-950',
    amber: 'border-amber-100 bg-amber-50 text-amber-950',
    emerald: 'border-emerald-100 bg-emerald-50 text-emerald-950',
    rose: 'border-rose-100 bg-rose-50 text-rose-950'
  };

  return (
    <section className={`rounded-lg border p-4 ${tones[tone]}`}>
      <p className='text-sm font-medium opacity-75'>{label}</p>
      <p className='mt-2 text-3xl font-bold'>{value}</p>
    </section>
  );
}
