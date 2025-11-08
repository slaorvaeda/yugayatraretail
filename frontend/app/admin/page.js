import AdminDashboard from '../components/admin/AdminDashboard';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const metadata = {
  title: 'Admin Console | Yugayatra Retail'
};

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

