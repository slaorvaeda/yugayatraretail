'use client';

const relationshipFilters = ['All', 'Active', 'Pending', 'Needs Attention'];

const RelationshipFilterBar = ({ activeFilter, onSelect }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {relationshipFilters.map((label) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeFilter === label
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default RelationshipFilterBar;

