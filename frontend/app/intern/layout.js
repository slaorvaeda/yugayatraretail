'use client';

import ProtectedRoute from '../components/auth/ProtectedRoute';
import InternSidebar from '../components/intern/InternSidebar';
import { InternWorkspaceProvider } from '../components/intern/InternWorkspaceContext';

export default function InternLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['intern']}>
      <InternWorkspaceProvider>
        <div className="min-h-screen bg-gradient-to-br from-[#f3f6ff] via-white to-[#e9f3ff] text-gray-900">
          <InternSidebar />
          <div className="mx-auto flex max-w-9/10">
            <div className="hidden w-[140px] lg:block" />
            <main className="flex-1 px-4 py-10 sm:px-6 lg:px-14">{children}</main>
          </div>
        </div>
      </InternWorkspaceProvider>
    </ProtectedRoute>
  );
}
