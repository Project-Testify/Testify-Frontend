import { createBrowserRouter, useLocation } from 'react-router-dom';
import {
  ErrorPage,
  SignInPage,
  OrgAdminDashBoard as OrgAdminPage,
  TutorDashBoard as TutorDashBoardPage,
  UserProfileDetailsPage,
  UserProfileActionsPage,
  UserProfileActivityPage,
  UserProfileFeedbackPage,
  UserProfileHelpPage,
  UserProfileInformationPage,
  UserProfilePreferencesPage,
  SignUpPage,
  AccountDeactivePage,
  PasswordResetPage,
  VerifyEmailPage,
  WelcomePage,
  OrgAdminExamPage,
} from '../pages';

import {
  DashboardLayout,
  UserAccountLayout,
  CommonLayout,
} from '../layouts';

import React, { ReactNode, useEffect } from 'react';

import { ProtectedRoute } from './ProtectedRoutes';
import { AuthProvider } from '../hooks/useAuth.tsx';


// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider> <SignInPage /></AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: '/auth',
    element: (<AuthProvider><PageWrapper children={<CommonLayout />} /></AuthProvider>)  ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup/*',
        element: <SignUpPage />,
      },
      // {
      //   path: 'signup/user',
      //   element: <SignUpPage />,
      // },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'welcome',
        element: <WelcomePage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'password-reset',
        element: <PasswordResetPage />,
      },
      {
        path: 'account-delete',
        element: <AccountDeactivePage />,
      },
    ],
  },
  {
    path: 'org-admin',
    // element: <PageWrapper children={<DashboardLayout />} />,
    element: (<AuthProvider><PageWrapper children={<DashboardLayout />} /></AuthProvider>)  ,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OrgAdminPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute roles={['ORGANIZATION']} children={<OrgAdminPage />} />,
        // element: <OrgAdminPage />,
        errorElement : <ErrorPage />  
      },
      {
        path: 'exams',
        element: <OrgAdminPage />,
      },
    ],
  },


  {
    path: 'tutor',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OrgAdminPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'dashboard',
        element: <TutorDashBoardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'exams',
        element: <OrgAdminPage />,
      },
    ],
  },

  {
    path: '/user-profile',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'details',
        element: <UserProfileDetailsPage />,
      },
      {
        path: 'preferences',
        element: <UserProfilePreferencesPage />,
      },
      {
        path: 'information',
        element: <UserProfileInformationPage />,
      },
      {
        path: 'activity',
        element: <UserProfileActivityPage />,
      },
      {
        path: 'actions',
        element: <UserProfileActionsPage />,
      },
      {
        path: 'help',
        element: <UserProfileHelpPage />,
      },
      {
        path: 'feedback',
        element: <UserProfileFeedbackPage />,
      },
    ],
  },
]);

export default router;
