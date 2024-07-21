import { createBrowserRouter, useLocation } from 'react-router-dom';
import {
  ErrorPage,
  // HomePage,
  SignInPage,
  HomePage,
  OrgAdminDashBoard as OrgAdminPage,
  ExamSetterDashBoardPage,
  UserProfileDetailsPage,
  UserProfileActionsPage,
  UserProfileActivityPage,
  UserProfileFeedbackPage,
  UserProfileHelpPage,
  UserProfileInformationPage,
  UserProfilePreferencesPage,
  ExamSummaryPage,
  ExamViewPage,
  SignUpPage,
  AccountDeactivePage,
  PasswordResetPage,
  VerifyEmailPage,
  WelcomePage,

  OrgAdminExamPage,
  OrgAdminNewExamPage,
  Groups,
  Candidates,
  CandidateDashboard,
  CandidateAllExams,
  CandidateOngoingExams,
  CandidateCompletedExams,
  CandidateUpcomingExams,
  CandidateBadges,
  CandidateGrading,
  CandidateActivityHistory,

  // examSetter
  OrganizationDashBoard

  DignosticTestPage
} from '../pages';

import {
  DashboardLayout,
  ExamSetterLayout,
  // UserAccountLayout,
  CommonLayout,
} from '../layouts';


import React, { ReactNode, useEffect } from 'react';

// import { ProtectedRoute } from './ProtectedRoutes';
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
      // <AuthProvider> <SignInPage /></AuthProvider>
      <HomePage />
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
        element: (
          <AuthProvider> <SignInPage /></AuthProvider>
        ),
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
    element: <PageWrapper children={<DashboardLayout />} />,
    // element: (<AuthProvider><PageWrapper children={<DashboardLayout />} /></AuthProvider>)  ,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OrgAdminPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'dashboard',
        // element: <ProtectedRoute roles={['ORGANIZATION']} children={<OrgAdminPage />} />,
        element: <OrgAdminPage />,
        errorElement: <ErrorPage />,

      },
      {
        path: 'exam',
        element: <OrgAdminExamPage />,
        errorElement : <ErrorPage />
      },
      {
        path: "new_exam",
        element: <OrgAdminNewExamPage />,
        errorElement: <ErrorPage />
      },
      {
        path: 'groups',
        // element: <Groups />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Groups />,
            errorElement: <ErrorPage />,


          },

          {
            // group id / candidates

            path: ':groupId/candidates',
            element: <Candidates />,
            errorElement: <ErrorPage />,
          }
        ]
      },
    ],
  },


  {
    path: 'examSetter',
    element: <PageWrapper children={<ExamSetterLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OrgAdminPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'dashboard',
        element: <ExamSetterDashBoardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'organization',
        element: <OrganizationDashBoard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'exams',
        element: <OrgAdminPage />,
      },
    ],
  },
  {
    path: '/candidate',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'exam',
        element: <ExamSummaryPage />,
        errorElement: <ErrorPage />,
},{
        path: 'dashboard',
        element: <CandidateDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'all-exams',
        element: <CandidateAllExams />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'completed-exams',
        element: <CandidateCompletedExams />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'ongoing-exams',
        element: <CandidateOngoingExams />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'upcoming-exams',
        element: <CandidateUpcomingExams />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'badges',
        element: <CandidateBadges />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'grading',
        element: <CandidateGrading />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'activity-history',
        element: <CandidateActivityHistory />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: 'exam/dignostic-test',
        element: <DignosticTestPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'exam/view',
        element: <ExamViewPage />,
        errorElement: <ErrorPage />,
      }

      
    ],

  },

  {
    path: 'user-profile',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserProfileDetailsPage />,
        errorElement: <ErrorPage />,
      },
      {
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
