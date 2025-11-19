'use client';

const TouchpointModal = ({ intern, form, onChange, onClose, onSave }) => {
  if (!intern) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl space-y-6 rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">New touchpoint</h3>
            <p className="text-sm text-slate-500">Record the latest interaction with {intern.full_name}.</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800">
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={onSave}>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(event) => onChange({ ...form, subject: event.target.value })}
              placeholder="e.g. Onboarding follow-up"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Summary</label>
            <textarea
              rows={4}
              value={form.summary}
              onChange={(event) => onChange({ ...form, summary: event.target.value })}
              placeholder="Share the main discussion points or outcomes."
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Next step (optional)</label>
            <input
              type="text"
              value={form.nextStep}
              onChange={(event) => onChange({ ...form, nextStep: event.target.value })}
              placeholder="e.g. Schedule mock interview"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20">
              Save touchpoint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TouchpointModal;

