'use client';

const HistoryModal = ({ intern, onClose, onViewTimeline, onAddTouchpoint }) => {
  if (!intern) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl space-y-6 rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">{intern.full_name}</h3>
            <p className="text-sm text-slate-500">{intern.email}</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800">
            ✕
          </button>
        </div>

        <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
          <div>
            <p className="uppercase text-[11px] tracking-[0.3em] text-slate-400">Status</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{intern.activation_status || 'pending'}</p>
          </div>
          <div>
            <p className="uppercase text-[11px] tracking-[0.3em] text-slate-400">Batch</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{intern.batch || 'Not assigned'}</p>
          </div>
          <div>
            <p className="uppercase text-[11px] tracking-[0.3em] text-slate-400">Phone</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{intern.phone || 'No phone on file'}</p>
          </div>
          <div>
            <p className="uppercase text-[11px] tracking-[0.3em] text-slate-400">Meet Link</p>
            <p className="mt-1 text-base font-semibold text-sky-600">
              {intern.meet_link ? (
                <a href={intern.meet_link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Join session
                </a>
              ) : (
                'Not scheduled'
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Notes</p>
          <p className="mt-2">
            {intern.admin_notes || 'No touchpoints recorded. Use “Add touchpoint” to capture a call or meeting summary.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            Close
          </button>
          <div className="flex gap-3">
            <button onClick={onViewTimeline} className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
              View timeline
            </button>
            <button onClick={onAddTouchpoint} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
              Add touchpoint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;

