'use client';

import InternCard from './InternCard';
import InternRow from './InternRow';

const BatchGroup = ({ batch, interns, expanded, onToggle, onViewHistory, onAddTouchpoint, onViewDetails, viewMode }) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_35px_80px_-60px_rgba(15,23,42,0.25)]">
      <button onClick={() => onToggle(batch)} className="flex w-full items-center justify-between text-left">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Batch</p>
          <h3 className="text-lg font-semibold text-slate-900">{batch}</h3>
          <p className="text-sm text-slate-500">
            {interns.length} intern{interns.length === 1 ? '' : 's'} in this cohort
          </p>
        </div>
        <span className={`text-xl transition ${expanded ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {expanded && (
        viewMode === 'grid' ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {interns.map((intern) => (
              <InternCard
                key={intern.id}
                intern={intern}
                onViewHistory={onViewHistory}
                onAddTouchpoint={onAddTouchpoint}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {interns.map((intern) => (
              <InternRow
                key={intern.id}
                intern={intern}
                onViewHistory={onViewHistory}
                onAddTouchpoint={onAddTouchpoint}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default BatchGroup;

