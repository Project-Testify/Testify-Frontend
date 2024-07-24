import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  UserOutlined,
  BankOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faBuildingUser, faMedal, faRankingStar, faClockRotateLeft, faChartColumn } from '@fortawesome/free-solid-svg-icons';

import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_EXAM, PATH_USER_PROFILE } from '../../constants';
import { PATH_HOME, PATH_ORG_ADMIN, PATH_CANDIDATE } from '../../constants/routes.ts';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const candidateItems: MenuProps['items'] = [
  getItem(
    <Link to={PATH_CANDIDATE.dashboard}>DashBoard</Link>,
    'dashboard',
    <FontAwesomeIcon icon={faChartColumn} />
  ),
  
  getItem('Exams', 'exam', <FontAwesomeIcon icon={faFilePen} />, [
    getItem(<Link to={PATH_CANDIDATE.all_exams}>All </Link>, 'exam', null),
    getItem(
      <Link to={PATH_CANDIDATE.completed_exams}>Completed </Link>,
      'new_exam',
      null
    ),
    getItem(
      <Link to={PATH_CANDIDATE.ongoing_exams}>Ongoing</Link>,
      'new_exam',
      null
    ),
    getItem(
      <Link to={PATH_CANDIDATE.upcoming_exams}>Upcoming</Link>,
      'new_exam',
      null
    )
  ]),
  getItem(
    'Organizations',
    'organizations',
    <FontAwesomeIcon icon={faBuildingUser} />
  ),
  getItem(
    <Link to={PATH_CANDIDATE.badges}>Badges </Link>,
    'organizations',
    <FontAwesomeIcon icon={faMedal} />
  ),
  getItem(
    <Link to={PATH_CANDIDATE.grading}>Grading </Link>,
    'organizations',
    <FontAwesomeIcon icon={faRankingStar} />
  ),
  getItem(
    <Link to={PATH_CANDIDATE.activity_history}>Activity History </Link>,
    'organizations',
    <FontAwesomeIcon icon={faClockRotateLeft} />
  ),
];



// org admin items
const orgAdminItems: MenuProps['items'] = [
  getItem(
    <Link to={PATH_ORG_ADMIN.dashboard}>DashBoard</Link>,
    'dashboard',
    <BarChartOutlined />
  ),

  getItem('Exams', 'exam', null, [], 'group'),

  getItem('Exams', 'exam', <BankOutlined />, [
    getItem(<Link to={PATH_ORG_ADMIN.exam}>All Exams</Link>, 'exam', null),
    getItem(
      <Link to={PATH_ORG_ADMIN.new_exam}>New Exams</Link>,
      'new_exam',
      null
    ),
  ]),

  getItem('Candidates', 'candidates', null, [], 'group'),

  getItem('Candidates', 'candidates', <BankOutlined />, [
    getItem(<Link to={PATH_ORG_ADMIN.groups}>Groups</Link>, 'all', null),
    getItem(
      <Link to={PATH_ORG_ADMIN.exam}>New Candidate</Link>,
      'new',
      null
    ),
  ]),


  getItem('Account', 'pages', null, [], 'group'),

  getItem('User profile', 'user-profile', <UserOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Details</Link>,
      'details',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Preferences</Link>,
      'preferences',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Information</Link>,
      'information',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Security</Link>,
      'security',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Activity</Link>,
      'activity',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Actions</Link>,
      'actions',
      null
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Help</Link>, 'help', null),
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Feedback</Link>,
      'feedback',
      null
    ),
  ]),
];

// ExamSetter items
const examSetterItems: MenuProps['items'] = [
  getItem(
    <Link to={PATH_DASHBOARD.org_admin}>DashBoard</Link>,
    'projects',
    null
  ),
  getItem('Organizations', 'organizations', <BankOutlined />, [
    getItem(<Link to={'org/name1'}>Organization 1</Link>, 'Org', null),
  ]),

//   getItem('Exams', 'pages', null, [], 'group'),

  getItem('Exams', 'exams', <BankOutlined />, [
    getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
    getItem(
      <Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>,
      'new_exam',
      null
    ),
    getItem(
      <Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>,
      'grading',
      null
    ),
  ]),

//   getItem('Results', 'results', null, [], 'group'),

  getItem('Results', 'results', <BarChartOutlined />, [
    getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
    getItem(
      <Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>,
      'new_exam',
      null
    ),
    getItem(
      <Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>,
      'grading',
      null
    ),
  ]),

//   getItem('Account', 'pages', null, [], 'group'),

  getItem('User profile', 'user-profile', <UserOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Details</Link>,
      'details',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Preferences</Link>,
      'preferences',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Information</Link>,
      'information',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Security</Link>,
      'security',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Activity</Link>,
      'activity',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Actions</Link>,
      'actions',
      null
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Help</Link>, 'help', null),
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Feedback</Link>,
      'feedback',
      null
    ),
  ]),
];



const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  // set the state of the role as either examSetter or orgadmin
  const [isRole, setIsRole] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes('org-admin')) {
      setIsRole('org-admin');
    } else if (pathname.includes('examSetter')) {
      setIsRole('examSetter');
    }else if (pathname.includes('candidate')) {
      setIsRole('candidate');
    }
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="black"
        asLink
        href={PATH_HOME.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: '1rem 0' }}
      />
      <ConfigProvider
        // theme={{
        //   components: {
        //     Menu: {
        //       itemBg: 'none',
        //       itemSelectedBg: COLOR['100'],
        //       itemHoverBg: COLOR['50'],
        //       itemSelectedColor: COLOR['600'],
        //     },
        //   },
        // }}
      >
        {isRole === 'org-admin' && (
          <Menu
            mode="inline"
            items={orgAdminItems}
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            style={{ border: 'none' }}
          />
        )}

        {isRole === 'examSetter' && (
          <Menu
            mode="inline"
            items={examSetterItems}
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            style={{ border: 'none' }}
          />
        )}

        {isRole === 'candidate' && (
          <Menu
            mode="inline"
            items={candidateItems}
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            style={{ border: 'none' }}
          />
        )}
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
