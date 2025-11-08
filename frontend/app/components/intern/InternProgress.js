'use client';

import { useMemo, useState } from 'react';
import { useInternWorkspace } from './InternWorkspaceContext';

const initialProgressForm = () => ({
  milestone: '',
  description: '',
  progressPercent: '0',
  targetDate: new Date().toISOString().slice(0, 10)
});

const parsePercent = (value) => {
  const numeric = Number(value ?? 0);
  return Number.isNaN(numeric) ? 0 : Math.min(Math.max(numeric, 0), 100);
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const InternProgress = () => {
  const { loading, error, user, profile, progression = [], submitProgress } = useInternWorkspace();
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialProgressForm);

  const isActive = profile?.activation_status === 'active';

  const stats = useMemo(() => {
    const total = progression.length;
    let completed = 0;
    let inProgress = 0;
    let planned = 0;

    progression.forEach((entry) => {
      const percent = parsePercent(entry.progress_percent ?? entry.progressPercent);
      if (percent >= 100) {
        completed += 1;
      } else if (percent > 0) {
        inProgress += 1;
      } else {
        planned += 1;
      }
    });

    return {
      total,
      completed,
      inProgress,
      planned
    };
  }, [progression]);

  const nextMilestones = useMemo(
    () =>
      progression
        .filter((entry) => parsePercent(entry.progress_percent ?? entry.progressPercent) < 100)
        .sort((a, b) => {
          const aDate = new Date(a.target_date ?? a.targetDate ?? 0).getTime();
          const bDate = new Date(b.target_date ?? b.targetDate ?? 0).getTime();
          return aDate - bDate;
        })
        .slice(0, 3),
    [progression]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    try {
      setSubmitting(true);
      await submitProgress({
        milestone: form.milestone,
        description: form.description,
        progressPercent: form.progressPercent,
        targetDate: form.targetDate
      });
      setShowModal(false);
      setForm(initialProgressForm);
      setFeedback('Progress milestone added.');
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Unable to add milestone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 pt-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Intern Workspace</p>
          <h1 className="text-3xl font-black text-gray-900">Milestone Progress</h1>
          <p className="text-sm text-gray-500">
            Track every milestone you capture during the Yugayatra Retail internship programme.
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
          Record Milestone
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
          Your profile is awaiting activation. Once the admin team activates your profile, you can create and manage
          milestones from here.
        </div>
      )}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Milestones', value: stats.total },
          { label: 'Completed', value: stats.completed },
          { label: 'In Progress', value: stats.inProgress },
          { label: 'Planned', value: stats.planned }
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
            <h2 className="text-xl font-semibold text-gray-900">Milestone Timeline</h2>
            {stats.total > 0 && <span className="text-sm text-gray-400">Showing latest {Math.min(12, stats.total)} milestones</span>}
          </div>
          <div className="mt-8 space-y-6">
            {loading ? (
              <p className="text-sm text-gray-500">Loading progression data…</p>
            ) : progression.length === 0 ? (
              <p className="text-sm text-gray-500">
                No milestones recorded yet. Use the “Record Milestone” button to capture your first achievement.
              </p>
            ) : (
              progression.slice(0, 12).map((item) => {
                const percent = parsePercent(item.progress_percent ?? item.progressPercent);
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="h-3 w-3 rounded-full bg-gray-900" />
                      <span className="h-full w-px bg-gray-200" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-900">{item.milestone}</h3>
                        <span className="text-xs uppercase tracking-[0.25em] text-gray-400">
                          Target {formatDate(item.target_date ?? item.targetDate)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      <div className="mt-3">
                        <div className="h-2 rounded-full bg-gray-100">
                          <div className="h-full rounded-full bg-gray-900" style={{ width: `${percent}%` }} />
                        </div>
                        <p className="mt-1 text-xs text-gray-400">{percent}% complete</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Targets</h2>
          <p className="mt-1 text-sm text-gray-500">Focus on the next key deliverables.</p>
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading upcoming milestones…</p>
            ) : nextMilestones.length === 0 ? (
              <p className="text-sm text-gray-500">
                All milestones are completed. Great work! Add a new milestone to continue your journey.
              </p>
            ) : (
              nextMilestones.map((item) => {
                const percent = parsePercent(item.progress_percent ?? item.progressPercent);
                return (
                  <div key={item.id} className="rounded-3xl border border-gray-100 bg-gray-50/80 p-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
                      <span>{formatDate(item.target_date ?? item.targetDate)}</span>
                      <span>{percent}%</span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">{item.milestone}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur px-4">
          <div className="w-full max-w-lg space-y-6 rounded-[28px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Add Milestone</h3>
                <p className="text-sm text-gray-500">Define a tangible outcome you are working towards.</p>
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
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Milestone</label>
                <input
                  type="text"
                  name="milestone"
                  value={form.milestone}
                  onChange={handleChange}
                  placeholder="Complete onboarding modules"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Breakdown of the milestone objectives"
                  className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Progress (%)</label>
                  <input
                    type="number"
                    name="progressPercent"
                    min="0"
                    max="100"
                    value={form.progressPercent}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Target Date</label>
                  <input
                    type="date"
                    name="targetDate"
                    value={form.targetDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    required
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
                  {submitting ? 'Saving…' : 'Save Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternProgress;


