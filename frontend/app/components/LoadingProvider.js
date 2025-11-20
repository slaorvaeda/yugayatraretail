'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Loader from './Loader';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  useEffect(() => {
    // Initial page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const startLoading = (message = 'Loading...') => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading, setLoadingMessage }}>
      {loading && <Loader fullScreen={true} message={loadingMessage} />}
      {children}
    </LoadingContext.Provider>
  );
}

