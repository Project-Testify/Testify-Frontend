import { createBrowserRouter, useLocation } from 'react-router-dom';
import {
  ErrorPage,
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
  ExamFeedback,
  OrgAdminExamPage,
  OrgAdminNewExamPage,
  OrgAdminExamSetters as OrgAdminExamSettersPage,
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
  CandidateOrganizations,
  DiagnosticTestPage,
  // examSetter
  OrganizationDashBoard,
  CandidateExpiredExams,
  Proctoring,
  ExamSetterNewExamPage,
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
import { ContactUs } from '../pages/ContactUs.tsx';
import { About } from '../pages/About.tsx';
import NewExamProvider from '../context/NewExamContext.tsx';
import { PATH_ADMIN } from '../constants/routes.ts';
import { AdminDashBoard } from '../pages/admin/AdminDashBoard.tsx';
import { OrganizationRequest } from '../pages/admin/OrganizationRequest.tsx';
import { ExamReports } from '../pages/admin/ExamReports.tsx';
import { UserReports } from '../pages/admin/UserReports.tsx';
import { OrganizationReports } from '../pages/admin/OrganizationReports.tsx';
import {GradingSection} from '../pages/examSetter/Grading.tsx';
// import { ExamRequest } from '../api/types.ts';

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
    path: '/about', // Define the path for ContactUs page
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact-us', // Define the path for ContactUs page
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/auth',
    element: (
      <AuthProvider>
        <PageWrapper children={<CommonLayout />} />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup/*',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: (
          <AuthProvider>
            {' '}
            <SignInPage />
          </AuthProvider>
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
    element: (
      <AuthProvider>
        <PageWrapper children={<DashboardLayout />} />
      </AuthProvider>
    ),
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
        errorElement: <ErrorPage />,
      },
      {
        path: 'new_exam',
        element: (
          <NewExamProvider>
            <OrgAdminNewExamPage />
          </NewExamProvider>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: 'exam-setters',
        element: <OrgAdminExamSettersPage />,
        errorElement: <ErrorPage />,
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
          },
        ],
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
        path: 'new_exam',
        element: (
          <NewExamProvider>
            <ExamSetterNewExamPage/>
          </NewExamProvider>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: 'proctoring',
        element: <Proctoring/>
      },
      {
        path: 'grading',
        element: <GradingSection/>
      }
    ],
  },
  {
    path: 'candidate',
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
      },
      {
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
        path: 'expired-exams',
        element: <CandidateExpiredExams />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'organizations',
        element: <CandidateOrganizations />,
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
        path: 'exam/diagnostic-test',
        element: <DiagnosticTestPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'exam/view',
        element: <ExamViewPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'exam/feedback',
        element: <ExamFeedback />,
        errorElement: <ErrorPage />,
      },
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

  {
    path: '/contact-us',
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    errorElement: <ErrorPage />,
    element: <About />,
  },

  // Admin routes

  {
    path: PATH_ADMIN.root,
    errorElement: <ErrorPage />,
    element: <PageWrapper children={<DashboardLayout />} />,
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
        errorElement: <ErrorPage />,
      },
      {
        path: PATH_ADMIN.dashboard,
        element : <AdminDashBoard />,
      },
      {
        path: PATH_ADMIN.organizationRequest,
        element: <OrganizationRequest />,
      },
      {
        path: PATH_ADMIN.examReports,
        element: <ExamReports />,
      },
      {
        path: PATH_ADMIN.userReports,
        element: <UserReports />,
      },
      {
        path: PATH_ADMIN.organizationReports,
        element: <OrganizationReports />,
      }
    ],
  },
]);

export default router;
 