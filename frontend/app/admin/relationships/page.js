import ProtectedRoute from '../../components/auth/ProtectedRoute';
import AdminRelationships from '../../components/admin/AdminRelationships';

export const metadata = {
  title: 'Relationship Network | Admin'
};

export default function AdminRelationshipsPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminRelationships />
    </ProtectedRoute>
  );
}
