'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';

export default function WorkPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to projects-work page
    router.push('/projects-work');
  }, [router]);

  return <Loader fullScreen={true} message="Redirecting to Projects & Work..." />;
}

