'use client';

import { useMemo, useState } from 'react';
import { useInternWorkspace } from './InternWorkspaceContext';

const cardBase = 'bg-white rounded-[28px] shadow-xl border border-gray-100';

const InternDashboard = () => {
  const { loading, error, user, profile, routines = [], progression = [], submitRoutine, submitProgress } =
    useInternWorkspace();
  const [feedback, setFeedback] = useState('');
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [routineForm, setRoutineForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    title: '',
    summary: '',
    status: 'planned',
    hoursSpent: '0',
    blockers: ''
  });
  const [progressForm, setProgressForm] = useState({
    milestone: '',
    description: '',
    progressPercent: '0',
    targetDate: new Date().toISOString().slice(0, 10)
  });
  const [submitting, setSubmitting] = useState({ routine: false, progression: false });

  const isActive = profile?.activation_status === 'active';
  const visibleRoutines = useMemo(() => isActive ? routines : [], [isActive, routines]);
  const visibleProgression = useMemo(() => isActive ? progression : [], [isActive, progression]);

  const latestRoutine = visibleRoutines[0];

  const routineByStatus = useMemo(() => {
    return visibleRoutines.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      {}
    );
  }, [visibleRoutines]);

  const handleRoutineChange = (event) => {
    const { name, value } = event.target;
    setRoutineForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgressChange = (event) => {
    const { name, value } = event.target;
    setProgressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoutineSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    try {
      setSubmitting((prev) => ({ ...prev, routine: true }));
      await submitRoutine({
        date: routineForm.date,
        title: routineForm.title,
        summary: routineForm.summary,
        status: routineForm.status,
        hoursSpent: routineForm.hoursSpent,
        blockers: routineForm.blockers
      });
      setShowRoutineModal(false);
      setRoutineForm({
        date: new Date().toISOString().slice(0, 10),
        title: '',
        summary: '',
        status: 'planned',
        hoursSpent: '0',
        blockers: ''
      });
      setFeedback('Routine submitted successfully.');
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Unable to submit routine.');
    } finally {
      setSubmitting((prev) => ({ ...prev, routine: false }));
    }
  };

  const handleProgressSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    try {
      setSubmitting((prev) => ({ ...prev, progression: true }));
      await submitProgress({
        milestone: progressForm.milestone,
        description: progressForm.description,
        progressPercent: progressForm.progressPercent,
        targetDate: progressForm.targetDate
      });
      setShowProgressModal(false);
      setProgressForm({
        milestone: '',
        description: '',
        progressPercent: '0',
        targetDate: new Date().toISOString().slice(0, 10)
      });
      setFeedback('Progress milestone added.');
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Unable to add milestone.');
    } finally {
      setSubmitting((prev) => ({ ...prev, progression: false }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pt-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Intern Workspace</p>
          <h1 className="text-3xl font-black text-gray-900">Your Daily Journey</h1>
        </div>
        {profile?.meet_link && (
          <a
            href={profile.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-gray-900/20"
          >
            Join Mentorship Meet ↗
          </a>
        )}
      </header>

      {error && (
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">{error}</div>
      )}
      {feedback && (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-700">{feedback}</div>
      )}

      <section className="grid xl:grid-cols-[340px,1fr] gap-8">
        <aside className={`${cardBase} p-8 space-y-6 bg-gradient-to-br from-[#1f1c2c] to-[#928dab] text-white`}>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Profile Status</p>
            <h2 className="text-3xl font-black mt-4">{profile?.activation_status || 'Pending Activation'}</h2>
            <p className="text-white/70 text-sm leading-relaxed mt-4">
              {profile?.activation_status === 'active'
                ? 'You have full access to the programme. Stay consistent with your routines and progress goals.'
                : 'Awaiting admin activation. Keep an eye on your email for updates and prepare for onboarding.'}
            </p>
          </div>
          <div className="bg-white/10 rounded-3xl p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Email</span>
              <span className="font-semibold truncate max-w-[150px] text-right">{user?.email || '—'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Batch</span>
              <span className="font-semibold">{profile?.batch || 'Not assigned'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Resume</span>
              {profile?.resume_url ? (
                <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                  View
                </a>
              ) : (
                <span className="font-semibold">—</span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Meet Link</span>
              <span className="font-semibold truncate max-w-[140px]">
                {profile?.meet_link ? profile.meet_link : 'Not assigned'}
              </span>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Total Routines Logged', value: visibleRoutines.length },
              { label: 'Milestones Created', value: visibleProgression.length },
              { label: 'Pending Reviews', value: routineByStatus.blocked || 0 }
            ].map((metric) => (
              <div key={metric.label} className={`${cardBase} p-6 bg-white`}>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{metric.label}</p>
                <p className="text-3xl font-semibold mt-4">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
            <div className={`${cardBase} p-6 bg-white space-y-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Progression Timeline</h3>
                  <p className="text-sm text-gray-500">Track your milestone achievements</p>
                </div>
                <button
                  type="button"
                  disabled={!isActive}
                  onClick={() => setShowProgressModal(true)}
                  className={`rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold transition ${
                    isActive ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 cursor-not-allowed bg-gray-100'
                  }`}
                >
                  Add Milestone
                </button>
              </div>
              <div className="space-y-6">
                {visibleProgression.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="w-3 h-3 rounded-full bg-gray-900"></span>
                      <span className="flex-1 w-px bg-gray-200"></span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-800">{item.milestone}</h4>
                        <span className="text-xs text-gray-400">Target {item.target_date}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
                      <div className="mt-3">
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full bg-gray-900" style={{ width: `${item.progress_percent}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{item.progress_percent}% complete</p>
                      </div>
                    </div>
                  </div>
                ))}
                {!visibleProgression.length && !loading && (
                  <p className="text-sm text-gray-500">No milestones created yet. Use the button above to add your first target.</p>
                )}
              </div>
            </div>

            <div className={`${cardBase} p-6 bg-white space-y-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Daily Routine Snapshot</h3>
                  <p className="text-sm text-gray-500">Latest submission insights</p>
                </div>
                <button
                  type="button"
                  disabled={!isActive}
                  onClick={() => setShowRoutineModal(true)}
                  className={`rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold transition ${
                    isActive ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 cursor-not-allowed bg-gray-100'
                  }`}
                >
                  Log Routine
                </button>
              </div>

              {latestRoutine ? (
                <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-gray-400">{latestRoutine.date}</span>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-900 text-white">
                      {latestRoutine.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">{latestRoutine.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{latestRoutine.summary}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Hours logged: <strong className="text-gray-700">{latestRoutine.hours_spent}</strong></span>
                    <span>Blockers: {latestRoutine.blockers || 'None'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No routines submitted yet. Log your first entry to get started.</p>
              )}

              <div className="space-y-3">
                {Object.entries(routineByStatus).map(([status, value]) => (
                  <div key={status} className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">{status.replace('_', ' ')}</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
                {!visibleRoutines.length && <p className="text-sm text-gray-400">Awaiting activation to start logging routines.</p>}
              </div>
            </div>
          </div>

          <div className={`${cardBase} p-6 bg-white`}>
            <h3 className="text-xl font-semibold mb-4">Routine History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-400">
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Hours</th>
                    <th className="pb-3 font-semibold">Blockers</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRoutines.slice(0, 15).map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 text-gray-500">{entry.date}</td>
                      <td className="py-3 font-medium text-gray-800">{entry.title}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-900 text-white">
                          {entry.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{entry.hours_spent}</td>
                      <td className="py-3 text-gray-400 max-w-[220px] truncate">{entry.blockers || '—'}</td>
                    </tr>
                  ))}
                  {!visibleRoutines.length && !loading && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        {isActive ? 'No routine updates captured yet.' : 'You will see routine history here once your account is activated.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {showRoutineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur px-4">
          <div className="bg-white rounded-[28px] shadow-2xl p-8 w-full max-w-lg space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Submit Routine</h3>
                <p className="text-sm text-gray-500">Capture your daily accomplishments</p>
              </div>
              <button onClick={() => setShowRoutineModal(false)} className="w-10 h-10 rounded-full bg-gray-100 text-gray-500">✕</button>
            </div>
            <form className="space-y-4" onSubmit={handleRoutineSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={routineForm.date}
                    onChange={handleRoutineChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={routineForm.status}
                    onChange={handleRoutineChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  >
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={routineForm.title}
                  onChange={handleRoutineChange}
                  placeholder="Design sprint planning"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>
                <textarea
                  name="summary"
                  value={routineForm.summary}
                  onChange={handleRoutineChange}
                  rows={3}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-none"
                  placeholder="Overview of your daily accomplishments"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hours Spent</label>
                  <input
                    type="number"
                    name="hoursSpent"
                    min="0"
                    max="24"
                    step="0.5"
                    value={routineForm.hoursSpent}
                    onChange={handleRoutineChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blockers</label>
                  <input
                    type="text"
                    name="blockers"
                    value={routineForm.blockers}
                    onChange={handleRoutineChange}
                    placeholder="Any challenges faced"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowRoutineModal(false)} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting.routine}
                  className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-gray-900/20 disabled:opacity-50"
                >
                  {submitting.routine ? 'Submitting…' : 'Submit Routine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProgressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur px-4">
          <div className="bg-white rounded-[28px] shadow-2xl p-8 w-full max-w-lg space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Add Milestone</h3>
                <p className="text-sm text-gray-500">Define the next step in your journey</p>
              </div>
              <button onClick={() => setShowProgressModal(false)} className="w-10 h-10 rounded-full bg-gray-100 text-gray-500">✕</button>
            </div>
            <form className="space-y-4" onSubmit={handleProgressSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Milestone</label>
                <input
                  type="text"
                  name="milestone"
                  value={progressForm.milestone}
                  onChange={handleProgressChange}
                  placeholder="Complete onboarding modules"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={progressForm.description}
                  onChange={handleProgressChange}
                  rows={3}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-none"
                  placeholder="Breakdown of the milestone objectives"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Progress (%)</label>
                  <input
                    type="number"
                    name="progressPercent"
                    min="0"
                    max="100"
                    value={progressForm.progressPercent}
                    onChange={handleProgressChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Date</label>
                  <input
                    type="date"
                    name="targetDate"
                    value={progressForm.targetDate}
                    onChange={handleProgressChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowProgressModal(false)} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting.progression}
                  className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-gray-900/20 disabled:opacity-50"
                >
                  {submitting.progression ? 'Saving…' : 'Save Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternDashboard;

