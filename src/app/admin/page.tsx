import AdminDashboard from '@/components/tools/AdminDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - LinkedIn Tools',
  description: 'Analytics and insights for LinkedIn Tools platform',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
