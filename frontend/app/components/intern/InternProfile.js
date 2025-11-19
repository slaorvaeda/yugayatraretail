'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInternWorkspace } from './InternWorkspaceContext';
import StudentVirtualIdCard from './StudentVirtualIdCard';
import CompletionCertificateTemplate from './documents/CompletionCertificateTemplate';

const InfoBlock = ({ label, value, fallback = '—' }) => (
  <div className="space-y-1">
    <p className="text-xs uppercase tracking-[0.35em] text-gray-400">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value ?? fallback}</p>
  </div>
);

const InternProfile = () => {
  const { loading, error, user, profile, routines = [], progression = [], updateProfile } = useInternWorkspace();
  const [editOpen, setEditOpen] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editAlert, setEditAlert] = useState('');
  const [editFormError, setEditFormError] = useState('');
  const [editForm, setEditForm] = useState({
    phone: '',
    college: '',
    specialisation: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  useEffect(() => {
    setEditForm({
      phone: profile?.phone || profile?.contact_number || '',
      college: profile?.college_name || '',
      specialisation: profile?.specialisation || '',
      bloodGroup: profile?.blood_group || '',
      emergencyContactName: profile?.emergency_contact_name || '',
      emergencyContactPhone: profile?.emergency_contact_phone || ''
    });
  }, [profile]);

  useEffect(() => {
    if (!editAlert) return;
    const timer = setTimeout(() => setEditAlert(''), 4000);
    return () => clearTimeout(timer);
  }, [editAlert]);
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setEditFormError('');
    try {
      setEditSubmitting(true);
      await updateProfile({
        phone: editForm.phone,
        college_name: editForm.college,
        specialisation: editForm.specialisation,
        blood_group: editForm.bloodGroup,
        emergency_contact_name: editForm.emergencyContactName,
        emergency_contact_phone: editForm.emergencyContactPhone
      });
      setEditAlert('Profile details updated successfully.');
      setEditOpen(false);
    } catch (err) {
      setEditFormError(err.response?.data?.message || 'Unable to update profile details. Please try again.');
    } finally {
      setEditSubmitting(false);
    }
  };


  const activationCopy = useMemo(() => {
    if (profile?.activation_status === 'active') {
      return 'You are fully active in the internship programme. Keep submitting routines and milestones to stay on track.';
    }
    if (profile?.activation_status === 'pending') {
      return 'Our admin team is reviewing your onboarding documents. You will receive an email once activation is complete.';
    }
    if (profile?.activation_status === 'blocked') {
      return 'Reach out to the admin team for support. Once the blocker is cleared, your workspace access will be restored.';
    }
    return 'Awaiting activation. Please ensure your onboarding documents are submitted and watch your inbox for updates.';
  }, [profile]);

  const routineStats = useMemo(() => {
    return {
      total: routines.length,
      completed: routines.filter((item) => item.status === 'completed').length,
      blocked: routines.filter((item) => item.status === 'blocked').length
    };
  }, [routines]);

  const milestoneStats = useMemo(() => {
    const total = progression.length;
    const completed = progression.filter((item) => Number(item.progress_percent ?? item.progressPercent) >= 100).length;
    return { total, completed };
  }, [progression]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 pt-16">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Intern Workspace</p>
        <h1 className="text-3xl font-black text-gray-900">Your Profile</h1>
        <p className="text-sm text-gray-500">
          Review your core details, activation state, and progress snapshots. Contact the admin team if something needs
          an update.
        </p>
      </header>

      {error && (
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">{error}</div>
      )}
      {editAlert && (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-700">
          {editAlert}
        </div>
      )}

      <section className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex justify-center lg:justify-start">
          <StudentVirtualIdCard
            name={user?.full_name || profile?.full_name || 'Intern Name'}
            role={profile?.role_title || 'Product Design Intern'}
            organisation="Yugayatra Retail (OPC) Pvt. Ltd."
            idNumber={profile?.unique_id || profile?.intern_code || 'YYR-INT-2025-042'}
            cohort={profile?.batch || 'Cohort 2025-A'}
            department={profile?.department || profile?.specialisation || 'Product & Design'}
            issueDate={profile?.activated_at ? new Date(profile.activated_at).toLocaleDateString() : '29 Sept 2025'}
            validUntil={
              profile?.internship_end_date ? new Date(profile.internship_end_date).toLocaleDateString() : '29 Nov 2025'
            }
            bloodGroup={profile?.blood_group || 'B+'}
            avatarUrl={
              profile?.avatar_url ||
              profile?.profile_photo_url ||
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=640&q=80'
            }
            qrCodeUrl={profile?.digital_badge_qr}
            verified={profile?.activation_status === 'active'}
          />
        </div>

        <div className="space-y-6 lg:flex-1">
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Account Overview</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Keep these details current so mentors and admins can reach you quickly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditFormError('');
                  setEditOpen(true);
                }}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
              >
                Edit details
              </button>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <InfoBlock label="Name" value={user?.full_name || profile?.full_name} />
              <InfoBlock label="Email" value={user?.email || profile?.email} />
              <InfoBlock label="Phone" value={profile?.phone || profile?.contact_number || '—'} />
              <InfoBlock label="Batch" value={profile?.batch || 'Not assigned yet'} />
              <InfoBlock label="College" value={profile?.college_name || '—'} />
              <InfoBlock label="Specialisation" value={profile?.specialisation || '—'} />
              <InfoBlock label="Blood Group" value={profile?.blood_group || '—'} />
              <InfoBlock
                label="Emergency Contact"
                value={
                  profile?.emergency_contact_name
                    ? `${profile.emergency_contact_name} · ${profile.emergency_contact_phone || '—'}`
                    : profile?.emergency_contact_phone || '—'
                }
              />
            </div>
            <div className="mt-8 rounded-3xl border border-gray-100 bg-gray-50/80 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Activation Status</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  {profile?.activation_status || 'pending'}
                </span>
                <span className="text-sm text-gray-500">{activationCopy}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">Quick Metrics</h2>
            <p className="mt-1 text-sm text-gray-500">Snapshot of your logged activity so far.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="rounded-3xl border border-gray-100 bg-gray-50/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Routines Logged</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{routineStats.total}</p>
                <p className="mt-1 text-xs text-gray-500">Completed {routineStats.completed}</p>
                <p className="mt-0.5 text-xs text-gray-500">Blocked {routineStats.blocked}</p>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-gray-50/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Milestones</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{milestoneStats.total}</p>
                <p className="mt-1 text-xs text-gray-500">Completed {milestoneStats.completed}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">Documents & Links</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <div className="flex items-center justify-between gap-3">
                <span>Resume</span>
                {profile?.resume_url ? (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900"
                  >
                    View Resume ↗
                  </a>
                ) : (
                  <span className="text-xs italic text-gray-400">Not uploaded</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Mentorship Meet Link</span>
                {profile?.meet_link ? (
                  <a
                    href={profile.meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Join Meet ↗
                  </a>
                ) : (
                  <span className="text-xs italic text-gray-400">Not assigned</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Completion Certificate</span>
                {profile?.completion_certificate_url ? (
                  <a
                    href={profile.completion_certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Download Certificate ↗
                  </a>
                ) : (
                  <span className="text-xs italic text-gray-400">Available after internship completion</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
        <h2 className="text-xl font-semibold text-gray-900">Need an Update?</h2>
        <p className="mt-3 text-sm text-gray-500">
          If any information here is inaccurate, email{' '}
          <a href="mailto:admin@yugayatraretail.com" className="font-semibold text-gray-900 underline">
            admin@yugayatraretail.com
          </a>{' '}
          with the corrected details. Routine and milestone data will refresh automatically each time you submit an
          update.
        </p>
      </section>

      <section className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-900/5">
        <h2 className="text-xl font-semibold text-gray-900">Completion Certificate Preview</h2>
        <p className="mt-2 text-sm text-gray-500">
          A digital-ready certificate using your latest profile information. Update your details to refresh this preview.
        </p>
        <div className="mt-6 overflow-auto rounded-[24px] border border-gray-200 bg-gray-50 p-6">
          <CompletionCertificateTemplate
            internName={user?.full_name || profile?.full_name || 'Intern Name'}
            internshipTitle={profile?.role_title || 'Software Engineer Intern'}
            startDate={
              profile?.internship_start_date
                ? new Date(profile.internship_start_date).toLocaleDateString()
                : '8th September 2025'
            }
            endDate={
              profile?.internship_end_date
                ? new Date(profile.internship_end_date).toLocaleDateString()
                : '8th November 2025'
            }
            internId={profile?.unique_id || profile?.intern_code || 'YYR-2025-001'}
          />
        </div>
      </section>

      {loading && (
        <div className="rounded-[28px] border border-gray-200 bg-white px-6 py-4 text-sm text-gray-500">
          Syncing profile data…
        </div>
      )}

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur px-4">
          <div className="w-full max-w-xl space-y-6 rounded-[28px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Edit Profile Details</h3>
                <p className="text-sm text-gray-500">Update contact and safety information for your internship profile.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {editFormError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{editFormError}</div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={editForm.bloodGroup}
                    onChange={handleEditChange}
                    placeholder="O+"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">College</label>
                  <input
                    type="text"
                    name="college"
                    value={editForm.college}
                    onChange={handleEditChange}
                    placeholder="University / Institute name"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Specialisation</label>
                  <input
                    type="text"
                    name="specialisation"
                    value={editForm.specialisation}
                    onChange={handleEditChange}
                    placeholder="e.g. Product Design"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={editForm.emergencyContactName}
                    onChange={handleEditChange}
                    placeholder="Guardian / Parent name"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={editForm.emergencyContactPhone}
                    onChange={handleEditChange}
                    placeholder="+91 99887 77665"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 disabled:opacity-60"
                >
                  {editSubmitting ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternProfile;


