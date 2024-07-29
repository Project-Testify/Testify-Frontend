import { AppLayout } from '../app';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../hooks/useAuth.tsx';


export const DashboardLayout = () => {
  return (
    <AuthProvider>
    <AppLayout>
    
      <Outlet />
    </AppLayout>
    </AuthProvider>
  );
};