import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import InternDetails from '../../../components/admin/InternDetails';

export const metadata = {
  title: 'Intern Overview | Yugayatra Retail'
};

export default async function InternDetailPage({ params }) {
  const { internId } = await params;

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <InternDetails internId={internId} />
    </ProtectedRoute>
  );
}

