'use client';

const mockTimeline = [
  {
    date: 'Mar 12, 2025',
    title: 'Onboarding call',
    summary: 'Discussed program goals and set expectations.',
    owner: 'Aditi Sharma'
  },
  {
    date: 'Feb 28, 2025',
    title: 'Mentor sync',
    summary: 'Reviewed project milestone progress and blockers.',
    owner: 'Mentor Team'
  },
  {
    date: 'Feb 10, 2025',
    title: 'Orientation checklist complete',
    summary: 'Intern submitted all required onboarding documents.',
    owner: 'HR Ops'
  }
];

const TimelineModal = ({ intern, onClose }) => {
  if (!intern) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl space-y-6 rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Relationship Timeline</h3>
            <p className="text-sm text-slate-500">Interaction history for {intern.full_name}</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800">
            ✕
          </button>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
          {mockTimeline.map((entry) => (
            <div key={entry.date} className="flex gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{entry.date}</span>
                <span className="mt-2 h-8 w-[1px] bg-gradient-to-b from-slate-200 via-slate-300 to-transparent" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-slate-900">{entry.title}</p>
                <p>{entry.summary}</p>
                <p className="text-xs text-slate-400">Owner: {entry.owner}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end">
          <button onClick={onClose} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineModal;

