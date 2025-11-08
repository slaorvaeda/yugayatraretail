'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/apiClient';

const navLinks = [
  'Relationship',
  'Opportunities',
  'Leads',
  'Calendar',
  'Cases',
  'Reports',
  'Quotes'
];

const requestTasks = [
  'Problem Resolution',
  'Customer Communication',
  'Testing and Verification',
  'Customer Notification',
  'Customer Satisfaction'
];

const caseStages = [
  {
    title: 'New Case Management',
    subtitle: 'Case Allocation',
    items: [
      { label: 'Allocate Case to User!', icon: '👤' },
      { label: 'Acknowledge case receipt to customer!', icon: '📬' }
    ]
  },
  {
    title: 'Issue Identification',
    subtitle: 'Issue Identification',
    items: [
      { label: 'Identify issue category' },
      { label: 'Identify issue severity' },
      { label: 'Identify issue impact' },
      { label: 'Allocate to resolution team' },
      { label: 'Advise customer of resolution estimate' }
    ]
  },
  {
    title: 'Technical Resolution',
    subtitle: 'Technical Resolution',
    highlight: 'Estimate resolution time',
    items: [
      { label: 'Identify issue dependencies' },
      { label: 'Identify issue resolution' },
      { label: 'Advise customer of resolution estimate' },
      { label: 'Advise customer issue resolved' }
    ]
  },
  {
    title: 'Request Processing',
    subtitle: 'New Tasks',
    tasks: requestTasks
  }
];

const knowledgeTemplates = [
  {
    subject: 'Design Sprint',
    status: 'Executed',
    startDate: '2023-09-30 01:12',
    endDate: '2023-10-01 00:11',
    owner: 'Sam Frank'
  },
  {
    subject: 'Meeting Lead',
    status: 'Scheduled',
    startDate: '2023-10-02 09:30',
    endDate: '2023-10-02 11:00',
    owner: 'Nitika Oliva'
  },
  {
    subject: 'Kickoff Playbook',
    status: 'Draft',
    startDate: '2023-10-06 15:00',
    endDate: '2023-10-08 18:30',
    owner: 'Team Ops'
  }
];

const routineStatusPalette = {
  planned: '#fbbf24',
  in_progress: '#2563eb',
  completed: '#10b981',
  blocked: '#f97316'
};

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({ interns: 0, activeInterns: 0, pendingInterns: 0 });
  const [routineStats, setRoutineStats] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [statusForm, setStatusForm] = useState({ activationStatus: 'pending', meetLink: '', notes: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryResponse, internResponse] = await Promise.all([
          apiClient.get('/admin/dashboard'),
          apiClient.get('/admin/interns')
        ]);

        setSummary(summaryResponse.data.totals);
        setRoutineStats(summaryResponse.data.routineStats || []);
        setInterns(internResponse.data.interns || []);
      } catch (err) {
        if (err.response?.status === 401) {
          router.push('/login');
          return;
        }
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  const routinePie = useMemo(() => {
    const total = routineStats.reduce((acc, entry) => acc + Number(entry.total || 0), 0);
    return routineStats.map((entry) => ({
      label: entry.status,
      value: Number(entry.total || 0),
      percentage: total ? Math.round((Number(entry.total || 0) / total) * 100) : 0
    }));
  }, [routineStats]);

  const openStatusModal = (intern) => {
    setSelectedIntern(intern);
    setStatusForm({
      activationStatus: intern.activation_status || 'pending',
      meetLink: intern.meet_link || '',
      notes: intern.admin_notes || ''
    });
  };

  const closeStatusModal = () => {
    setSelectedIntern(null);
    setStatusForm({ activationStatus: 'pending', meetLink: '', notes: '' });
  };

  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setStatusForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateInternStatus = async (event) => {
    event.preventDefault();
    if (!selectedIntern) return;
    try {
      setIsSaving(true);
      const previousStatus = selectedIntern.activation_status || 'pending';
      const response = await apiClient.patch(`/admin/interns/${selectedIntern.id}/status`, {
        activationStatus: statusForm.activationStatus,
        meetLink: statusForm.meetLink || undefined,
        notes: statusForm.notes || undefined
      });

      const updatedProfile = response.data.profile;
      setInterns((prev) =>
        prev.map((intern) =>
          intern.id === selectedIntern.id ? { ...intern, ...updatedProfile } : intern
        )
      );

      setSummary((prev) => ({
        ...prev,
        activeInterns:
          statusForm.activationStatus === 'active'
            ? prev.activeInterns + (previousStatus === 'active' ? 0 : 1)
            : prev.activeInterns - (previousStatus === 'active' ? 1 : 0),
        pendingInterns:
          statusForm.activationStatus === 'pending'
            ? prev.pendingInterns + (previousStatus === 'pending' ? 0 : 1)
            : prev.pendingInterns - (previousStatus === 'pending' ? 1 : 0)
      }));

      closeStatusModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update intern status');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 pt-12">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-gray-900">Customer Journeys</h1>
          <p className="text-sm text-gray-500">New Case Management Overview</p>
        </div>
        <div className="flex flex-1 flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-end">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-400">
            {navLinks.map((link, index) => (
              <span
                key={link}
                className={`cursor-pointer transition ${
                  link === 'Cases' ? 'text-gray-900 font-semibold' : 'hover:text-gray-600'
                }`}
              >
                {link}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[...Array(7)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold"
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            <button className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">⋯</button>
          </div>
        </div>
      </header>

      <section className="rounded-[40px] bg-gradient-to-b from-[#f2f4ff] via-white to-[#eef2ff] py-12 shadow-[0_45px_90px_-60px_rgba(99,102,241,0.35)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            {caseStages.map((stage, idx) => (
              <div key={stage.title} className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      idx === 0
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[10px] tracking-[0.35em] text-slate-400 hidden xl:block">
                    {stage.subtitle}
                  </span>
                </div>
                {idx < caseStages.length - 1 && <span className="hidden h-px w-16 bg-gradient-to-r from-slate-200 to-transparent xl:block" />}
              </div>
            ))}
          </div>

          <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4">
            {caseStages.map((stage, idx) => (
              <div
                key={stage.title}
                className={`flex h-full flex-col rounded-[32px] border border-white bg-white/90 p-6 shadow-[0_35px_80px_-60px_rgba(15,23,42,0.35)] backdrop-blur`}
              >
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{stage.subtitle}</p>
                  <h2 className="text-lg font-semibold text-slate-900">{stage.title}</h2>
                </div>

                {stage.items && (
                  <div className="mt-6 space-y-4">
                    {stage.items.map((item, itemIdx) => (
                      <div
                        key={`${stage.title}-${itemIdx}`}
                        className={`flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-slate-300 ${
                          stage.highlight === item.label ? 'ring-2 ring-slate-300' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-base">
                            {item.icon || '•'}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        <span className="hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-300 sm:flex">
                          ✓
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {stage.tasks && (
                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl bg-gray-900 px-6 py-8 text-white shadow-lg">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Next Step</p>
                      <h3 className="mt-2 text-lg font-semibold">Request Processing</h3>
                      <p className="mt-3 text-xs text-white/70">Coordinate teams to close outstanding actions swiftly.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {stage.tasks.map((task) => (
                        <div
                          key={task}
                          className="flex h-16 items-center justify-center rounded-3xl border border-slate-200 bg-white text-center text-sm font-semibold text-slate-600 shadow-sm"
                        >
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Knowledge</p>
              <h3 className="text-xl font-semibold text-slate-900">Suggested Knowledge</h3>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-500">＋</button>
              <button className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-500">📅</button>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  <th className="pb-3 font-semibold">Subject</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Start</th>
                  <th className="pb-3 font-semibold">End</th>
                  <th className="pb-3 font-semibold">Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {knowledgeTemplates.map((item) => (
                  <tr key={item.subject} className="transition hover:bg-slate-50/70">
                    <td className="py-3 font-medium text-slate-900">{item.subject}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{item.startDate}</td>
                    <td className="py-3 text-slate-500">{item.endDate}</td>
                    <td className="py-3 text-slate-500">{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Support</p>
              <h3 className="text-xl font-semibold text-slate-900">Support Ticket Journey</h3>
            </div>
            <button className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-500">＋</button>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#edf2f7" strokeWidth="4"></circle>
                {routinePie.reduce((acc, slice) => {
                  const { offset } = acc;
                  const dashArray = `${slice.percentage} ${100 - slice.percentage}`;
                  const path = (
                    <circle
                      key={slice.label}
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={routineStatusPalette[slice.label] || '#6366f1'}
                      strokeWidth="4"
                      strokeDasharray={dashArray}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  );
                  const nextOffset = offset - slice.percentage;
                  return { offset: nextOffset, nodes: [...acc.nodes, path] };
                }, { offset: 25, nodes: [] }).nodes}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-semibold text-slate-900">{summary.activeInterns}</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Executed</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 text-sm text-slate-500">
              {routinePie.map((slice) => (
                <div key={slice.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: routineStatusPalette[slice.label] || '#6366f1' }}
                    />
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {slice.label.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{slice.value}</p>
                  <p className="text-xs text-slate-400">{slice.percentage}% of tickets</p>
                </div>
              ))}
              {!routinePie.length && (
                <p className="col-span-2 text-center text-sm text-slate-400">No support ticket data yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Directory</p>
            <h3 className="text-xl font-semibold text-slate-900">Intern Directory</h3>
          </div>
          <div className="flex gap-4 text-sm text-slate-500">
            <span>
              Total: <strong className="text-slate-900">{summary.interns}</strong>
            </span>
            <span>
              Pending: <strong className="text-amber-500">{summary.pendingInterns}</strong>
            </span>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="text-xs uppercase tracking-[0.35em] text-slate-400">
                <th className="pb-3 font-semibold">Intern</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Batch</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Meet Link</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-4 font-medium text-slate-900">{intern.full_name}</td>
                  <td className="py-4 text-slate-500">{intern.email}</td>
                  <td className="py-4 text-slate-500">{intern.batch || '—'}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      intern.activation_status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : intern.activation_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-slate-100 text-slate-500'
                    }`}>
                      {intern.activation_status || intern.status || 'pending'}
                    </span>
                  </td>
                  <td className="py-4 text-blue-500">
                    {intern.meet_link ? (
                      <a href={intern.meet_link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {intern.meet_link}
                      </a>
                    ) : (
                      <span className="text-slate-400">Not assigned</span>
                    )}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => openStatusModal(intern)}
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {!interns.length && !loading && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No intern records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[28px] shadow-2xl p-8 w-full max-w-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Manage {selectedIntern.full_name}</h3>
                <p className="text-sm text-gray-500">Update activation status and share onboarding resources</p>
              </div>
              <button onClick={closeStatusModal} className="w-10 h-10 rounded-full bg-gray-100 text-gray-500">✕</button>
            </div>

            <form className="space-y-5" onSubmit={updateInternStatus}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Activation Status</label>
                <select
                  name="activationStatus"
                  value={statusForm.activationStatus}
                  onChange={handleStatusChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Meet Link</label>
                <input
                  type="url"
                  name="meetLink"
                  value={statusForm.meetLink}
                  onChange={handleStatusChange}
                  placeholder="https://meet.google.com/..."
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HR Notes</label>
                <textarea
                  name="notes"
                  value={statusForm.notes}
                  onChange={handleStatusChange}
                  rows={3}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-none"
                  placeholder="Share activation notes or onboarding tasks"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeStatusModal}
                  className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-gray-900/20 disabled:opacity-50"
                >
                  {isSaving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

