'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/apiClient';

const statusStates = {
  LOADING: 'loading',
  AUTHORIZED: 'authorized',
  UNAUTHORIZED: 'unauthorized'
};

const resolveRedirect = (role) => {
  if (role === 'admin') {
    return '/admin';
  }
  if (role === 'intern') {
    return '/intern';
  }
  return '/login';
};

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const router = useRouter();
  const [state, setState] = useState({ status: statusStates.LOADING, user: null });

  useEffect(() => {
    let isSubscribed = true;

    const guard = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        router.replace('/login');
        if (isSubscribed) {
          setState({ status: statusStates.UNAUTHORIZED, user: null });
        }
        return;
      }

      try {
        const { data } = await apiClient.get('/auth/me');
        const userRole = data?.user?.role;

        if (allowedRoles.length && !allowedRoles.includes(userRole)) {
          router.replace(resolveRedirect(userRole));
          if (isSubscribed) {
            setState({ status: statusStates.UNAUTHORIZED, user: data.user });
          }
          return;
        }

        if (isSubscribed) {
          setState({ status: statusStates.AUTHORIZED, user: data.user });
        }
      } catch (error) {
        console.error('Authorization check failed:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        router.replace('/login');
        if (isSubscribed) {
          setState({ status: statusStates.UNAUTHORIZED, user: null });
        }
      }
    };

    guard();

    return () => {
      isSubscribed = false;
    };
  }, [allowedRoles, router]);

  if (state.status !== statusStates.AUTHORIZED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4fb]">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-6 text-center">
          <p className="text-sm font-semibold text-gray-600 tracking-[0.3em] uppercase">Verifying Access</p>
          <p className="mt-4 text-lg font-medium text-gray-900">Hold on while we secure your workspace…</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

