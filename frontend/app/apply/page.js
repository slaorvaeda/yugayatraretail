'use client';
import InternshipForm from '../components/InternshipForm';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ApplyPage() {
  return (
    <ErrorBoundary>
      <InternshipForm />
    </ErrorBoundary>
  );
}

