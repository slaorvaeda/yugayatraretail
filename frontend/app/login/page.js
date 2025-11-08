'use client';
import AuthForm from '../components/AuthForm';
import ErrorBoundary from '../components/ErrorBoundary';

export default function LoginPage() {
  return (
    <ErrorBoundary>
      <AuthForm />
    </ErrorBoundary>
  );
}

