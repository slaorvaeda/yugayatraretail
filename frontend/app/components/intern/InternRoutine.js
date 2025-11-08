'use client';

import { useMemo, useState } from 'react';
import { useInternWorkspace } from './InternWorkspaceContext';

const initialRoutineForm = () => ({
  date: new Date().toISOString().slice(0, 10),
  title: '',
  summary: '',
  status: 'planned',
  hoursSpent: '0',
  blockers: ''
});

const parseHours = (value) => {
  const numeric = Number(value ?? 0);
  return Number.isNaN(numeric) ? 0 : Math.max(numeric, 0);
};

const formatHours = (value) => {
  const numeric = Number(value ?? 0);
  if (Number.isNaN(numeric)) {
    return '0';
  }
  return Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(1);
};

const statusLabels = {
  planned: 'Planned',
  in_progress: 'In Progress',
  completed: 'Completed',
  blocked: 'Blocked'
};

const InternRoutine = () => {
  const { loading, error, profile, routines = [], submitRoutine } = useInternWorkspace();
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialRoutineForm);

  const isActive = profile?.activation_status === 'active';

  const metrics = useMemo(() => {
    const totalEntries = routines.length;
    const totalHours = routines.reduce(
      (sum, entry) => sum + parseHours(entry.hours_spent ?? entry.hoursSpent ?? entry.hours),
      0
    );
    const byStatus = routines.reduce(
      (acc, entry) => {
        const status = entry.status || 'planned';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { planned: 0, in_progress: 0, completed: 0, blocked: 0 }
    );

    return { totalEntries, totalHours, byStatus };
  }, [routines]);

  const latestEntries = useMemo(() => routines.slice(0, 15), [routines]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    try {
      setSubmitting(true);
      await submitRoutine({
        date: form.date,
        title: form.title,
        summary: form.summary,
        status: form.status,
        hoursSpent: form.hoursSpent,
        blockers: form.blockers
      });
      setShowModal(false);
      setForm(initialRoutineForm);
      setFeedback('Routine submitted successfully.');
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Unable to submit routine.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 pt-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Intern Workspace</p>
          <h1 className="text-3xl font-black text-gray-900">Daily Routine Log</h1>
          <p className="text-sm text-gray-500">
            Capture your day-to-day accomplishments, time investments, and blockers in one place.
          </p>
        </div>
        <button
          type="button"
          disabled={!isActive}
          onClick={() => setShowModal(true)}
          className={`rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition ${
            isActive
              ? 'bg-gray-900 text-white hover:bg-black'
              : 'cursor-not-allowed bg-gray-200 text-gray-500 shadow-none'
          }`}
        >
          Log Routine
        </button>
      </header>

      {error && (
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">{error}</div>
      )}
      {feedback && (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-700">
          {feedback}
        </div>
      )}
      {!isActive && !loading && (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-700">
          Routine logging unlocks once the admin team activates your profile. Until then, prepare your daily cadence and
          keep an offline journal.
        </div>
      )}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Routines Logged', value: metrics.totalEntries },
          { label: 'Hours Captured', value: formatHours(metrics.totalHours) },
          { label: 'Completed', value: metrics.byStatus.completed || 0 },
          { label: 'Blocked', value: metrics.byStatus.blocked || 0 }
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-[28px] border border-gray-100 bg-white px-6 py-7 shadow-lg shadow-gray-900/5"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{metric.label}</p>
            <p className="mt-4 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Routine History</h2>
            {metrics.totalEntries > 0 && (
              <span className="text-sm text-gray-400">Showing latest {Math.min(15, metrics.totalEntries)} entries</span>
            )}
          </div>
          <div className="mt-6 overflow-x-auto">
            {loading ? (
              <p className="py-6 text-sm text-gray-500">Loading routine entries…</p>
            ) : routines.length === 0 ? (
              <p className="py-6 text-sm text-gray-500">
                No routine entries recorded yet. Use “Log Routine” to capture your first update.
              </p>
            ) : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.25em] text-gray-400">
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Hours</th>
                    <th className="pb-3 font-semibold">Blockers</th>
                  </tr>
                </thead>
                <tbody>
                  {latestEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 text-gray-500">{entry.date}</td>
                      <td className="py-3 font-medium text-gray-800">{entry.title}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                          {statusLabels[entry.status] || entry.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{formatHours(entry.hours_spent ?? entry.hoursSpent)}</td>
                      <td className="py-3 text-gray-400">{entry.blockers || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">Status Overview</h2>
            <p className="mt-1 text-sm text-gray-500">Monitor how your workstreams are progressing.</p>
            <div className="mt-4 space-y-3">
              {Object.entries(metrics.byStatus).map(([status, value]) => (
                <div key={status} className="flex items-center justify-between text-sm text-gray-500">
                  <span className="capitalize">{statusLabels[status] || status}</span>
                  <span className="font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">Consistency Tips</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li>Log routines at the same time each day so mentors can review promptly.</li>
              <li>Highlight blockers early to unlock support from the mentorship team.</li>
              <li>Use the summary field to capture tangible deliverables and links.</li>
            </ul>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur px-4">
          <div className="w-full max-w-lg space-y-6 rounded-[28px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Submit Routine</h3>
                <p className="text-sm text-gray-500">Capture your daily accomplishments for mentor review.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="h-10 w-10 rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
                type="button"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    required
                  >
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Design sprint planning"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Summary</label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Key deliverables, learnings, and updates for the day"
                  className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Hours Spent</label>
                  <input
                    type="number"
                    name="hoursSpent"
                    min="0"
                    max="24"
                    step="0.5"
                    value={form.hoursSpent}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Blockers</label>
                  <input
                    type="text"
                    name="blockers"
                    value={form.blockers}
                    onChange={handleChange}
                    placeholder="Highlight any challenges"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 disabled:opacity-50"
                >
                  {submitting ? 'Submitting…' : 'Submit Routine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternRoutine;

