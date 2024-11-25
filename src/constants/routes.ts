function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
const ROOTS_HOME = '/home';
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_SITEMAP = '/sitemap';
const ROOTS_LAYOUT = '/layouts';
const ROOTS_CORPORATE = '/corporate';
const ROOTS_PROFILE = '/user-profile';
const ROOTS_SOCIAL = '/social';
const ROOTS_BLOG = '/blog';
const ROOTS_CAREERS = '/careers';
const ROOTS_ACCOUNT = '/account';
const ROOTS_AUTH = '/auth';
const ROOTS_PROJECTS = '/projects';
const ROOTS_CONTACTS = '/contacts';
const ROOTS_USER_MGMT = '/user-management';
const ROOTS_SUBSCRIPTION = '/subscription';
const ROOTS_INVOICE = '/invoice';
const ROOTS_FILE_MGMT = '/file-manager';
const ROOTS_INBOX = '/inbox';
const ROOTS_CALENDAR = '/calendar';
const ROOTS_ERRORS = '/errors';
const ROOTS_ABOUT = '/about';
const ROOTS_ORG_ADMIN = '/org-admin';
const ROOTS_CANDIDATE = '/candidate';
const ROOTS_TUTOR = '/examSetter';
const ROOTS_ADMIN = '/admin'

export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export const PATH_HOME = {
  root: ROOTS_HOME,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  org_admin: path(ROOTS_DASHBOARD, '/orgadmin'),
  default: path(ROOTS_DASHBOARD, '/default'),
  //   projects: path(ROOTS_DASHBOARD, '/projects'),
  //   ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  //   marketing: path(ROOTS_DASHBOARD, '/marketing'),
  //   social: path(ROOTS_DASHBOARD, '/social'),
  //   bidding: path(ROOTS_DASHBOARD, '/bidding'),
  //   learning: path(ROOTS_DASHBOARD, '/learning'),
  //   logistics: path(ROOTS_DASHBOARD, '/logistics'),
};

export const PATH_EXAM = {
  root: ROOTS_DASHBOARD,
  exam: path(ROOTS_DASHBOARD, '/exam'),
};

export const PATH_SITEMAP = {
  root: ROOTS_SITEMAP,
};

export const PATH_LAYOUT = {
  root: ROOTS_LAYOUT,
  sidebar: {
    light: path(ROOTS_LAYOUT, '/sidebar/light'),
    dark: path(ROOTS_LAYOUT, '/sidebar/dark'),
    minimized: path(ROOTS_LAYOUT, '/sidebar/minimized'),
  },
  header: {
    light: path(ROOTS_LAYOUT, '/header/light'),
    dark: path(ROOTS_LAYOUT, '/header/dark'),
    overlay: path(ROOTS_LAYOUT, '/header/overlay'),
  },
};

export const PATH_CORPORATE = {
  root: ROOTS_CORPORATE,
  about: path(ROOTS_CORPORATE, '/about'),
  team: path(ROOTS_CORPORATE, '/team'),
  faqs: path(ROOTS_CORPORATE, '/faqs'),
  contact: path(ROOTS_CORPORATE, '/contact'),
  pricing: path(ROOTS_CORPORATE, '/pricing'),
  license: path(ROOTS_CORPORATE, '/license'),
};

export const PATH_USER_PROFILE = {
  root: ROOTS_PROFILE,
  details: path(ROOTS_PROFILE, '/details'),
  preferences: path(ROOTS_PROFILE, '/preferences'),
  personalInformation: path(ROOTS_PROFILE, '/information'),
  security: path(ROOTS_PROFILE, '/security'),
  activity: path(ROOTS_PROFILE, '/activity'),
  action: path(ROOTS_PROFILE, '/actions'),
  help: path(ROOTS_PROFILE, '/help'),
  feedback: path(ROOTS_PROFILE, '/feedback'),
};

export const PATH_SOCIAL = {
  root: ROOTS_SOCIAL,
  feed: path(ROOTS_SOCIAL, '/feed'),
  activity: path(ROOTS_SOCIAL, '/activity'),
  followers: path(ROOTS_SOCIAL, '/followers'),
  settings: path(ROOTS_SOCIAL, '/settings'),
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  details: (id: string | number): string => path(ROOTS_BLOG, `/view/${id}`),
};

export const PATH_CAREERS = {
  root: ROOTS_CAREERS,
  new: path(ROOTS_CAREERS, `/new`),
};

export const PATH_ACCOUNT = {
  root: ROOTS_ACCOUNT,
  settings: path(ROOTS_ACCOUNT, '/settings'),
  security: path(ROOTS_ACCOUNT, '/security'),
  activity: path(ROOTS_ACCOUNT, '/activity'),
  billing: path(ROOTS_ACCOUNT, '/billing'),
  statements: path(ROOTS_ACCOUNT, '/statements'),
  referral: path(ROOTS_ACCOUNT, '/referral'),
  api: path(ROOTS_ACCOUNT, '/api-keys'),
  logs: path(ROOTS_ACCOUNT, '/logs'),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
  passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
  welcome: path(ROOTS_AUTH, '/welcome'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email'),
  accountDelete: path(ROOTS_AUTH, '/account-delete'),
};

export const PATH_ERROR = {
  root: ROOTS_ERRORS,
  error400: path(ROOTS_ERRORS, '/400'),
  error403: path(ROOTS_ERRORS, '/403'),
  error404: path(ROOTS_ERRORS, '/404'),
  error500: path(ROOTS_ERRORS, '/500'),
  error503: path(ROOTS_ERRORS, '/503'),
};

export const PATH_PROJECTS = {
  root: ROOTS_PROJECTS,
  details: (id: string | number): string => path(ROOTS_PROJECTS, `/view/${id}`),
};

export const PATH_CONTACTS = {
  root: ROOTS_CONTACTS,
  details: (id: string | number): string => path(ROOTS_CONTACTS, `/view/${id}`),
  new: path(ROOTS_CONTACTS, '/new'),
  editDetails: (id: string | number): string =>
    path(ROOTS_CONTACTS, `/edit/${id}`),
};

export const PATH_USER_MGMT = {
  root: ROOTS_USER_MGMT,
  users: {
    all: path(ROOTS_USER_MGMT, '/users'),
    details: (id: string | number): string =>
      path(ROOTS_USER_MGMT, `/view/${id}`),
  },
  roles: {
    all: path(ROOTS_USER_MGMT, '/roles'),
    details: (id: string | number): string =>
      path(ROOTS_USER_MGMT, `/roles/view/${id}`),
  },
  permissions: path(ROOTS_USER_MGMT, '/permissions'),
};

export const PATH_INVOICE = {
  root: ROOTS_INVOICE,
  new: path(ROOTS_INVOICE, `/new`),
  details: (id: string | number): string =>
    path(ROOTS_USER_MGMT, `/view/${id}`),
};

export const PATH_FILE = {
  root: ROOTS_FILE_MGMT,
  files: path(ROOTS_FILE_MGMT, `/files`),
  blank: path(ROOTS_FILE_MGMT, `/blank`),
};

export const PATH_INBOX = {
  root: ROOTS_INBOX,
  new: path(ROOTS_INBOX, `/new`),
  details: (id: string | number): string => path(ROOTS_INBOX, `/view/${id}`),
  blank: path(ROOTS_INBOX, `/blank`),
};

export const PATH_CALENDAR = {
  root: ROOTS_CALENDAR,
};

export const PATH_SUBSCRIPTION = {
  root: ROOTS_SUBSCRIPTION,
  list: path(ROOTS_SUBSCRIPTION, `/list`),
  new: path(ROOTS_SUBSCRIPTION, `/new`),
  details: (id: string | number): string =>
    path(ROOTS_SUBSCRIPTION, `/view/${id}`),
};

export const PATH_START = {
  root: 'https://mantine-analytics-dashboard-docs.netlify.app/getting-started',
};

export const PATH_DOCS = {
  help: 'https://github.com/design-sparx/antd-multipurpose-dashboard/blob/main/README.md',
  components: 'https://6546507b657a74164abf2db6-oniqlpqtfs.chromatic.com/',
  productRoadmap:
    'https://kelvink96.notion.site/1af2c000eb4f4b1688684cb2d88d5ee4?v=eb14f3050b7d4357821dbcb4bb61b636&p=752cacbf390f4d1cbc0e625550391d9b&pm=s',
};

export const PATH_CHANGELOG = {
  root: '',
};

export const PATH_GITHUB = {
  org: 'https://github.com/design-sparx',
  personal: 'https://github.com/kelvink96',
  repo: 'https://github.com/design-sparx/antd-multipurpose-dashboard',
};

export const PATH_SOCIALS = {
  behance: 'https://www.behance.net/kelvink96',
  dribbble: 'https://dribbble.com/kelvink96',
  facebook: 'https://www.facebook.com/kelvinkk96',
  instagram: 'https://www.instagram.com/kelvink_96/',
  linkedin: 'https://www.linkedin.com/in/kelvink96/',
  youtube: 'https://twitter.com/kelvink_96',
};

export const PATH_ABOUT = {
  root: ROOTS_ABOUT,
};

export const PATH_ORG_ADMIN = {
  root: ROOTS_ORG_ADMIN,
  dashboard: path(ROOTS_ORG_ADMIN, '/dashboard'),
  exam: path(ROOTS_ORG_ADMIN, '/exam'),
  new_exam: path(ROOTS_ORG_ADMIN, '/new_exam'),
  complete_exam: path(ROOTS_ORG_ADMIN, '/complete_exam'),
  groups: path(ROOTS_ORG_ADMIN, '/groups'),
  exam_setters: path(ROOTS_ORG_ADMIN, '/exam-setters'),
};

export const PATH_CANDIDATE = {
  root: ROOTS_CANDIDATE,
  dashboard: path(ROOTS_CANDIDATE, '/dashboard'),
  all_exams: path(ROOTS_CANDIDATE, '/all-exams'),
  upcoming_exams: path(ROOTS_CANDIDATE, '/upcoming-exams'),
  ongoing_exams: path(ROOTS_CANDIDATE, '/ongoing-exams'),
  completed_exams: path(ROOTS_CANDIDATE, '/completed-exams'),
  expired_exams: path(ROOTS_CANDIDATE, '/expired-exams'),
  organizations: path(ROOTS_CANDIDATE, '/organizations'),
  badges: path(ROOTS_CANDIDATE, '/badges'),
  grading: path(ROOTS_CANDIDATE, '/grading'),
  activity_history: path(ROOTS_CANDIDATE, '/activity-history'),
};

export const PATH_TUTOR = {
  root: ROOTS_TUTOR,
  dashboard: path(ROOTS_TUTOR, '/dashboard'),
  proctoring: path(ROOTS_TUTOR, '/proctoring'),
  grading: path(ROOTS_TUTOR, '/grading')
}

export const PATH_ADMIN = {
  root : ROOTS_ADMIN,
  dashboard : path(ROOTS_ADMIN, "/dashboard"),
  organizationRequest : path(ROOTS_ADMIN, "/organization-request"),
  examReports : path(ROOTS_ADMIN, "/exam-reports"),
  userReports : path(ROOTS_ADMIN, "/user-reports"),
  organizationReports : path(ROOTS_ADMIN, "/organization-reports"),
}
