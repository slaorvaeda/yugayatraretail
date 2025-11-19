'use client';

import { RiEyeLine } from 'react-icons/ri';

const statusChipClasses = (status) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'inactive':
    case 'rejected':
      return 'bg-slate-100 text-slate-500';
    default:
      return 'bg-slate-100 text-slate-500';
  }
};

const InternRow = ({ intern, onViewHistory, onAddTouchpoint, onViewDetails }) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white/90 px-5 py-4 shadow-[0_20px_40px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-[200px] flex-1">
          <p className="text-base font-semibold text-slate-900">{intern.full_name}</p>
          <p className="text-sm text-slate-500">{intern.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails?.(intern)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
            type="button"
            title="View details"
          >
            <RiEyeLine className="text-lg" />
          </button>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusChipClasses(intern.activation_status)}`}>
            {intern.activation_status || intern.status || 'pending'}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
        <p>
          <span className="font-semibold text-slate-700">Meet link:</span>{' '}
          {intern.meet_link ? (
            <a href={intern.meet_link} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
              Join session
            </a>
          ) : (
            'Not scheduled'
          )}
        </p>
        <p className="min-w-[280px] flex-1">
          <span className="font-semibold text-slate-700">Notes:</span>{' '}
          {intern.admin_notes || 'No partnership notes yet.'}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          onClick={() => onViewHistory(intern)}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900"
        >
          View history
        </button>
        <button
          onClick={() => onAddTouchpoint(intern)}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-900/20"
        >
          Add touchpoint
        </button>
      </div>
    </div>
  );
};

export default InternRow;

