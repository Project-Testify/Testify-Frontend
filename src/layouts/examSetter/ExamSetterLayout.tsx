import { AppLayout } from './app'
import { Outlet } from 'react-router-dom';

export const ExamSetterLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};