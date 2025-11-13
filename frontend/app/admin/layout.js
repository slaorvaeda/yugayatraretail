import AdminSidebar from '../components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Console | Yugayatra Retail'
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6fb] via-white to-[#edf1ff] text-gray-900">
      <AdminSidebar />
      <div className="mx-auto flex max-w-9/10">        
        <div className="hidden xl:block w-[140px]" />
        <main className="flex-1 px-6 sm:px-8 lg:px-16 py-10">{children}</main>
      </div>
    </div>
  );
}
