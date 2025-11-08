'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/apiClient';
import RelationshipFilterBar from './relationships/RelationshipFilterBar';
import BatchGroup from './relationships/BatchGroup';
import HistoryModal from './relationships/HistoryModal';
import TouchpointModal from './relationships/TouchpointModal';
import TimelineModal from './relationships/TimelineModal';
import InternCard from './relationships/InternCard';
import InternRow from './relationships/InternRow';
import { RiLayoutGridLine, RiListCheck, RiSearchLine } from 'react-icons/ri';

const AdminRelationships = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState('batch');
  const [interns, setInterns] = useState([]);
  const [expandedBatch, setExpandedBatch] = useState(null);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [touchpointIntern, setTouchpointIntern] = useState(null);
  const [touchpointForm, setTouchpointForm] = useState({
    subject: '',
    summary: '',
    nextStep: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [timelineIntern, setTimelineIntern] = useState(null);

  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        const { data } = await apiClient.get('/admin/interns');
        setInterns(data.interns || []);
      } catch (err) {
        if (err.response?.status === 401) {
          router.push('/login');
          return;
        }
        setError(err.response?.data?.message || 'Unable to load relationships');
      } finally {
        setLoading(false);
      }
    };

    fetchRelationships();
  }, [router]);

  const filteredInterns = interns
    .filter((intern) => {
      if (filter === 'All') return true;
      if (filter === 'Active') return intern.activation_status === 'active';
      if (filter === 'Pending') return intern.activation_status === 'pending';
      if (filter === 'Needs Attention') return intern.activation_status === 'blocked' || intern.activation_status === 'inactive';
      return true;
    })
    .filter((intern) => {
      if (!searchQuery.trim()) return true;
      const normalized = searchQuery.toLowerCase();
      return (
        intern.full_name?.toLowerCase().includes(normalized) ||
        intern.email?.toLowerCase().includes(normalized) ||
        intern.batch?.toLowerCase().includes(normalized)
      );
    });

  const groupedByBatch = useMemo(() => {
    const groups = filteredInterns.reduce((acc, intern) => {
      const key = intern.batch || 'Unassigned';
      acc[key] = acc[key] ? [...acc[key], intern] : [intern];
      return acc;
    }, {});
    const sortedKeys = Object.keys(groups).sort((a, b) => a.localeCompare(b));
    return sortedKeys.map((batch) => ({ batch, interns: groups[batch] }));
  }, [filteredInterns]);

  const handleTouchpointSave = (event) => {
    event.preventDefault();
    if (!touchpointIntern || !touchpointForm.subject.trim() || !touchpointForm.summary.trim()) {
      return;
    }

    setInterns((prev) =>
      prev.map((intern) =>
        intern.id === touchpointIntern.id
          ? {
              ...intern,
              admin_notes: `${intern.admin_notes ? intern.admin_notes + '\n\n' : ''}${touchpointForm.subject}: ${touchpointForm.summary}${
                touchpointForm.nextStep ? `\nNext: ${touchpointForm.nextStep}` : ''
              }`
            }
          : intern
      )
    );
    setSuccessMessage('Touchpoint captured. Sync the backend endpoint when ready.');
    setTouchpointIntern(null);
    setTouchpointForm({ subject: '', summary: '', nextStep: '' });
  };

  return (
    <div className="space-y-8 pt-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Admin Relationships</p>
          <h1 className="text-3xl font-bold text-slate-900">Partner & Intern Network</h1>
          <p className="text-sm text-slate-500">Monitor activation health and follow up on interns awaiting support.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <RelationshipFilterBar activeFilter={filter} onSelect={setFilter} />
          <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 text-slate-500 shadow-sm">
            <button
              onClick={() => setDisplayMode('batch')}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                displayMode === 'batch' ? 'bg-slate-900 text-white shadow' : 'hover:text-slate-800'
              }`}
              type="button"
            >
              Batch view
            </button>
            <button
              onClick={() => setDisplayMode('all')}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                displayMode === 'all' ? 'bg-slate-900 text-white shadow' : 'hover:text-slate-800'
              }`}
              type="button"
            >
              All interns
            </button>
          </div>
          <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 text-slate-500 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                viewMode === 'grid' ? 'bg-slate-900 text-white shadow' : 'hover:text-slate-800'
              }`}
              type="button"
            >
              <RiLayoutGridLine className="text-lg" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                viewMode === 'list' ? 'bg-slate-900 text-white shadow' : 'hover:text-slate-800'
              }`}
              type="button"
            >
              <RiListCheck className="text-lg" />
              List
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">{error}</div>
      )}

      {successMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Relationship Overview</h2>
            <p className="text-sm text-slate-500">
              {filteredInterns.length} connection{filteredInterns.length === 1 ? '' : 's'} visible - grouped by cohort
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <RiSearchLine className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search intern, email, batch"
                className="w-[240px] rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-600 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="py-10 text-center text-sm text-slate-500">Loading relationship data…</div>
        ) : groupedByBatch.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">No relationships match the current filter.</div>
        ) : (
          <div className="space-y-6">
            {displayMode === 'batch'
              ? groupedByBatch.map(({ batch, interns: batchInterns }) => (
                  <BatchGroup
                    key={batch}
                    batch={batch}
                    interns={batchInterns}
                    expanded={expandedBatch === batch}
                    viewMode={viewMode}
                    onToggle={(selected) => setExpandedBatch((prev) => (prev === selected ? null : selected))}
                    onViewHistory={(intern) => setSelectedIntern(intern)}
                    onViewDetails={(intern) => router.push(`/admin/interns/${intern.id}`)}
                    onAddTouchpoint={(intern) => {
                      setTouchpointIntern(intern);
                      setTouchpointForm({ subject: '', summary: '', nextStep: '' });
                    }}
                  />
                ))
              : filteredInterns.length === 0
                ? [
                    <div key="empty" className="rounded-2xl border border-slate-200 bg-white/70 px-6 py-8 text-center text-sm text-slate-500">
                      No interns match the current filters.
                    </div>
                  ]
                : viewMode === 'grid'
                  ? [
                      <div key="grid" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredInterns.map((intern) => (
                          <InternCard
                            key={intern.id}
                            intern={intern}
                            onViewHistory={(selected) => setSelectedIntern(selected)}
                            onViewDetails={(selected) => router.push(`/admin/interns/${selected.id}`)}
                            onAddTouchpoint={(selected) => {
                              setTouchpointIntern(selected);
                              setTouchpointForm({ subject: '', summary: '', nextStep: '' });
                            }}
                          />
                        ))}
                      </div>
                    ]
                  : filteredInterns.map((intern) => (
                      <InternRow
                        key={intern.id}
                        intern={intern}
                        onViewHistory={(selected) => setSelectedIntern(selected)}
                        onViewDetails={(selected) => router.push(`/admin/interns/${selected.id}`)}
                        onAddTouchpoint={(selected) => {
                          setTouchpointIntern(selected);
                          setTouchpointForm({ subject: '', summary: '', nextStep: '' });
                        }}
                      />
                    ))}
          </div>
        )}
      </section>

      <HistoryModal
        intern={selectedIntern}
        onClose={() => setSelectedIntern(null)}
        onViewTimeline={() => setTimelineIntern(selectedIntern)}
        onAddTouchpoint={() => {
          setTouchpointIntern(selectedIntern);
          setTouchpointForm({ subject: '', summary: '', nextStep: '' });
        }}
      />

      <TouchpointModal
        intern={touchpointIntern}
        form={touchpointForm}
        onChange={setTouchpointForm}
        onClose={() => setTouchpointIntern(null)}
        onSave={handleTouchpointSave}
      />

      <TimelineModal intern={timelineIntern} onClose={() => setTimelineIntern(null)} />
    </div>
  );
};

export default AdminRelationships;
