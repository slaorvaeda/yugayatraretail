'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/apiClient';

const InternWorkspaceContext = createContext(undefined);

export const InternWorkspaceProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [progression, setProgression] = useState([]);
  const [lastFetchedAt, setLastFetchedAt] = useState(null);

  const fetchWorkspace = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiClient.get('/interns/me');
      setUser(response.data.user || response.data.profile?.user || null);
      setProfile(response.data.profile || null);
      setRoutines(response.data.routines || []);
      setProgression(response.data.progression || []);
      setLastFetchedAt(Date.now());
    } catch (err) {
      if (err.response?.status === 401) {
        router.push('/login');
        return;
      }
      setError(err.response?.data?.message || 'Unable to load intern workspace data.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  const submitRoutine = useCallback(
    async ({ date, title, summary, status, hoursSpent, blockers }) => {
      const payload = {
        date,
        title,
        summary,
        status,
        hoursSpent,
        blockers
      };

      const response = await apiClient.post('/interns/routine', payload);
      const newRoutine = response.data.routine;
      setRoutines((prev) => [newRoutine, ...prev]);
      return newRoutine;
    },
    []
  );

  const submitProgress = useCallback(
    async ({ milestone, description, progressPercent, targetDate }) => {
      const payload = {
        milestone,
        description,
        progressPercent,
        targetDate
      };

      const response = await apiClient.post('/interns/progress', payload);
      const newProgress = response.data.progression;
      setProgression((prev) => [newProgress, ...prev]);
      return newProgress;
    },
    []
  );

  const updateProfile = useCallback(async (updates) => {
    const candidateUpdates = [];
    const endpoints = ['/interns/me', '/interns/profile'];

    for (const endpoint of endpoints) {
      try {
        const response = await apiClient.put(endpoint, updates);
        candidateUpdates.push(response?.data);
        break;
      } catch (err) {
        const status = err.response?.status;
        if (status && (status === 404 || status === 405)) {
          // Try next endpoint
          continue;
        }
        throw err;
      }
    }

    const payload = candidateUpdates.at(-1);
    const updatedProfile = payload?.profile || payload || updates;

    setProfile((prev) => ({ ...(prev || {}), ...updatedProfile }));
    return updatedProfile;
  }, []);

  const contextValue = useMemo(
    () => ({
      loading,
      error,
      setError,
      user,
      profile,
      routines,
      progression,
      refresh: fetchWorkspace,
      lastFetchedAt,
      submitRoutine,
      submitProgress,
      updateProfile
    }),
    [
      loading,
      error,
      user,
      profile,
      routines,
      progression,
      fetchWorkspace,
      lastFetchedAt,
      submitRoutine,
      submitProgress,
      updateProfile
    ]
  );

  return <InternWorkspaceContext.Provider value={contextValue}>{children}</InternWorkspaceContext.Provider>;
};

export const useInternWorkspace = () => {
  const context = useContext(InternWorkspaceContext);
  if (context === undefined) {
    throw new Error('useInternWorkspace must be used within an InternWorkspaceProvider');
  }
  return context;
};


