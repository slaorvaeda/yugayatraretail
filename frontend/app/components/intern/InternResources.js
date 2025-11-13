'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useInternWorkspace } from './InternWorkspaceContext';

const resources = [
  {
    title: 'Internship Kick-off Guide',
    description: 'Step-by-step onboarding tasks, programme expectations, and key contacts for your first week.',
    actionLabel: 'Open Notion Workspace',
    href: 'https://www.notion.so/yugayatra-retail/intern-onboarding'
  },
  {
    title: 'Brand & Design Toolkit',
    description: 'Logos, colour palettes, and Canva templates for social creatives and pitch decks.',
    actionLabel: 'Launch Canva Folder',
    href: 'https://www.canva.com/brand/yugayatra-retail'
  },
  {
    title: 'Upwork Delivery SOP',
    description: 'Delivery checklists, client communication templates, and QA standards for Upwork projects.',
    actionLabel: 'Download SOP Checklist',
    href: 'https://drive.google.com/yugayatra-retail/upwork-sop'
  },
  {
    title: 'Engineering Handbook',
    description: 'Coding standards, Git flow, API integration patterns, and review expectations.',
    actionLabel: 'View Handbook',
    href: 'https://github.com/yugayatra-retail/engineering-handbook'
  }
];

const knowledgeBase = [
  {
    title: 'Weekly Stand-up Rhythm',
    content:
      'Submit your routine log before 7 PM IST daily. Join the Monday stand-up via the meet link on your dashboard.'
  },
  {
    title: 'Task Management',
    content:
      'Track assignments in ClickUp. Move cards across stages and tag mentors when you need feedback or review.'
  },
  {
    title: 'Escalation Matrix',
    content:
      'Blockers longer than 24 hours? Post in the intern Slack channel and tag #mentor-support for rapid assistance.'
  }
];

const supportChannels = [
  {
    label: 'Slack',
    description: 'Ask questions in #internship-support. Response SLA: 2 business hours.'
  },
  {
    label: 'Mentor 1:1s',
    description: 'Book weekly coaching via Calendly for deep-dives on deliverables and growth goals.'
  },
  {
    label: 'Resource Library',
    description: 'Access recordings, templates, and past showcase decks in the shared Google Drive.'
  }
];

const InternResources = () => {
  const { user, profile } = useInternWorkspace();

  const greeting = useMemo(() => {
    const fullName = user?.full_name || profile?.full_name || profile?.user?.full_name;
    if (!fullName) return 'Intern';
    const firstName = fullName.split(' ')[0];
    return firstName || 'Intern';
  }, [user, profile]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 pt-16">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Intern Workspace</p>
        <h1 className="text-3xl font-black text-gray-900">Resources & Playbooks</h1>
        <p className="text-sm text-gray-500">
          Everything you need to deliver confidently at Yugayatra Retail. Save these links and revisit them whenever you
          need direction.
        </p>
        <div className="mt-4 rounded-[28px] border border-gray-100 bg-white p-6 shadow-lg shadow-gray-900/5">
          <p className="text-sm text-gray-500">
            Welcome back, <span className="font-semibold text-gray-900">{greeting}</span>. Your active cohort:{' '}
            <span className="font-semibold text-gray-900">{profile?.batch || 'Not assigned yet'}</span>. Reach out to your
            mentor for a personalised learning roadmap once you submit your first routine.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <div key={resource.title} className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">{resource.description}</p>
            <Link
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
            >
              {resource.actionLabel} ↗
            </Link>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
          <h2 className="text-xl font-semibold text-gray-900">Knowledge Base Highlights</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review these essentials before every check-in to stay aligned with programme expectations.
          </p>
          <div className="mt-6 space-y-5">
            {knowledgeBase.map((item) => (
              <div key={item.title} className="rounded-3xl border border-gray-100 bg-gray-50/80 p-5">
                <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">Support Channels</h2>
            <p className="mt-1 text-sm text-gray-500">Collaborate closely with the admin and mentor teams.</p>
            <div className="mt-4 space-y-4">
              {supportChannels.map((item) => (
                <div key={item.label} className="rounded-3xl border border-gray-100 bg-gray-50/80 p-5">
                  <h3 className="text-sm font-semibold text-gray-900">{item.label}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-900/5">
            <h2 className="text-xl font-semibold text-gray-900">Need Additional Access?</h2>
            <p className="mt-3 text-sm text-gray-500">
              Request repo permissions, analytics dashboards, or marketplace credentials by raising a ticket in ClickUp →
              `Workspace / Requests / Intern`. SLA: 1 business day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternResources;


