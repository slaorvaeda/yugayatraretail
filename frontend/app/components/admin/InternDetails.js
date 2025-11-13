'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine, RiDownloadLine, RiExternalLinkLine } from 'react-icons/ri';
import apiClient from '../../lib/apiClient';
import OfferLetterTemplate from './documents/OfferLetterTemplate';
import CompletionCertificateTemplate from '../intern/documents/CompletionCertificateTemplate';

const DocumentButton = ({ label, href, onClick, disabled, loading }) => {
  const isDisabled = disabled || loading || (!href && !onClick);
  const className = `flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
    isDisabled
      ? 'border border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed'
      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900'
  }`;
  const contentLabel = loading ? 'Generating…' : label;

  if (onClick && !isDisabled) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <RiDownloadLine />
        {contentLabel}
      </button>
    );
  }

  if (href && !isDisabled) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <RiDownloadLine />
        {contentLabel}
      </a>
    );
  }

  return (
    <button type="button" className={className} disabled>
      <RiDownloadLine />
      {contentLabel}
    </button>
  );
};

const InfoRow = ({ label, value, href }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{label}</span>
    {href && value ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700"
      >
        {value}
        <RiExternalLinkLine />
      </a>
    ) : (
      <span className="text-sm text-slate-600">{value || '—'}</span>
    )}
  </div>
);

const InternDetails = ({ internId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [touchpointForm, setTouchpointForm] = useState({
     subject: '',
     summary: '',
     nextStep: ''
   });
  const [successMessage, setSuccessMessage] = useState('');
  const [timelineIntern, setTimelineIntern] = useState(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingCertificate, setDownloadingCertificate] = useState(false);
  const offerLetterRef = useRef(null);
  const completionCertificateRef = useRef(null);

  const handleOfferLetterDownload = useCallback(async () => {
    if (!offerLetterRef.current) return;
    try {
      setDownloadingPdf(true);
      const [html2canvasModule, jsPdfModule] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPdfModule;

      const canvas = await html2canvas(offerLetterRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        onclone: (documentClone) => {
          const root = documentClone.querySelector('#offer-letter-print');
          if (root) {
            root.style.boxShadow = 'none';
            root.style.fontFamily = 'Helvetica, Arial, sans-serif';
          }
          documentClone.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
            node.remove();
          });
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scaleToHeight = pageHeight / imgHeight;
      const renderWidth = imgWidth * scaleToHeight;
      const renderHeight = pageHeight;
      const offsetX = (pageWidth - renderWidth) / 2;
      const offsetY = 0;

      pdf.addImage(imgData, 'PNG', offsetX, offsetY, renderWidth, renderHeight);

      const safeName = offerLetterRef.current.dataset?.candidateName
        ? offerLetterRef.current.dataset.candidateName.replace(/\s+/g, '-').toLowerCase()
        : 'offer-letter';
      pdf.save(`${safeName}-offer-letter.pdf`);
    } catch (err) {
      console.error('Failed to generate offer letter PDF', err);
      alert('Unable to generate offer letter PDF. Please try again in a moment.');
    } finally {
      setDownloadingPdf(false);
    }
  }, []);

  const handleCompletionCertificateDownload = useCallback(async () => {
    if (!completionCertificateRef.current) return;
    try {
      setDownloadingCertificate(true);
      const [html2canvasModule, jsPdfModule] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPdfModule;

      const canvas = await html2canvas(completionCertificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('l', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const renderWidth = imgWidth * scale;
      const renderHeight = imgHeight * scale;
      const offsetX = (pageWidth - renderWidth) / 2;
      const offsetY = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', offsetX, offsetY, renderWidth, renderHeight);

      const safeName = completionCertificateRef.current.dataset?.internName
        ? completionCertificateRef.current.dataset.internName.replace(/\s+/g, '-').toLowerCase()
        : 'intern';
      pdf.save(`${safeName}-completion-certificate.pdf`);
    } catch (err) {
      console.error('Failed to generate completion certificate PDF', err);
      alert('Unable to generate completion certificate. Please try again in a moment.');
    } finally {
      setDownloadingCertificate(false);
    }
  }, []);

  useEffect(() => {
    if (!internId) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/admin/interns/${internId}`);
        setData(data);
      } catch (err) {
        if (err.response?.status === 401) {
          router.push('/login');
          return;
        }
        setError(err.response?.data?.message || 'Unable to load intern details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [internId, router]);

  const onboardingDate = useMemo(() => {
    if (!data?.user?.created_at) return null;
    return new Date(data.user.created_at).toLocaleDateString();
  }, [data]);

  const activationDate = useMemo(() => {
    if (!data?.profile?.activated_at) return null;
    return new Date(data.profile.activated_at).toLocaleDateString();
  }, [data]);

  const offerLetterProps = useMemo(() => {
    if (!data?.user) return null;
    const today = new Date();
    const issueDateString = today.toLocaleDateString();

    const activation = data?.profile?.activated_at ? new Date(data.profile.activated_at) : today;
    const startDateString = activation.toLocaleDateString();
    const end = new Date(activation);
    end.setMonth(end.getMonth() + 2);
    const endDateString = end.toLocaleDateString();

    return {
      candidateName: data.user.full_name,
      candidateEmail: data.user.email,
      issueDate: issueDateString,
      startDate: startDateString,
      endDate: endDateString
    };
  }, [data]);

  const completionCertificateProps = useMemo(() => {
    if (!data?.user) return null;
    const formatDate = (value, fallback) => {
      if (!value) return fallback;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
    };

    return {
      internName: data.user.full_name,
      internshipTitle: data.profile?.role_title || data.profile?.designation || 'Software Engineer Intern',
      startDate: formatDate(data.profile?.internship_start_date, formatDate(data.profile?.activated_at, 'N/A')),
      endDate: formatDate(data.profile?.internship_end_date, 'N/A'),
      internId: data.profile?.intern_code || data.profile?.unique_id || data.user?.id || 'N/A'
    };
  }, [data]);

  if (loading) {
    return (
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white/70 px-6 py-16 text-center text-slate-500 shadow">
        Loading intern details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-6 text-sm text-red-600 shadow">
        {error}
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white/70 px-6 py-16 text-center text-slate-500 shadow">
        No intern record found.
      </div>
    );
  }

  const { user, profile, routines = [], progression = [] } = data;

  return (
    <div className="space-y-10 pt-12">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          type="button"
        >
          <RiArrowLeftLine />
          Back to relationships
        </button>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
            {profile?.activation_status || user.status}
          </span>
          {activationDate && <span>Activated · {activationDate}</span>}
          {onboardingDate && <span>Onboarded · {onboardingDate}</span>}
        </div>
      </div>

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Intern</p>
              <h1 className="text-3xl font-bold text-slate-900">{user.full_name}</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone || 'Not provided'} />
              <InfoRow label="Batch" value={profile?.batch || 'Not assigned'} />
              <InfoRow label="Meet link" value={profile?.meet_link ? 'Join meeting' : 'Not scheduled'} href={profile?.meet_link} />
              <InfoRow label="Resume" value={profile?.resume_url ? 'Download resume' : 'Not uploaded'} href={profile?.resume_url} />
              <InfoRow label="HR Notes" value={profile?.admin_notes || '—'} />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Documents</p>
            <div className="flex flex-col gap-2">
              <DocumentButton
                label="Offer Letter"
                onClick={handleOfferLetterDownload}
                disabled={!offerLetterProps}
                loading={downloadingPdf}
              />
              <DocumentButton
                label="Completion Certificate"
                onClick={handleCompletionCertificateDownload}
                disabled={!completionCertificateProps}
                loading={downloadingCertificate}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Progress Milestones</h2>
            <Link href={`/admin`} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {progression.length ? (
              progression.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{entry.milestone}</p>
                  <p className="mt-1 text-sm text-slate-500">{entry.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>Progress · {entry.progress_percent}%</span>
                    {entry.target_date && <span>Target · {new Date(entry.target_date).toLocaleDateString()}</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No progression entries available yet.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-900">Recent Routine Updates</h2>
          <div className="mt-4 space-y-4">
            {routines.length ? (
              routines.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                      {entry.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{entry.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{entry.summary}</p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No routine entries recorded yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {offerLetterProps && (
         <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-lg">
           <h2 className="mb-6 text-lg font-semibold text-slate-900">Offer Letter Preview</h2>
          <div
            id="offer-letter-print"
            ref={offerLetterRef}
            data-candidate-name={offerLetterProps.candidateName}
          >
            <OfferLetterTemplate {...offerLetterProps} />
          </div>
         </section>
       )}

      {completionCertificateProps && (
        <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-lg">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">Completion Certificate Preview</h2>
          <div
            ref={completionCertificateRef}
            data-intern-name={completionCertificateProps.internName}
            className="overflow-auto rounded-[28px] border border-slate-100 bg-slate-50 p-6"
          >
            <CompletionCertificateTemplate {...completionCertificateProps} />
          </div>
        </section>
      )}
    </div>
  );
};

export default InternDetails;

