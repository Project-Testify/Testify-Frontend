import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  ConfigProvider,
  Layout,
  Menu,
  MenuProps,
  SiderProps,
  Dropdown,
  Button,
  Flex,
} from 'antd';


import { Logo } from '../../../components';
import { Link, useLocation } from 'react-router-dom';
import {
  PATH_EXAM,
  PATH_USER_PROFILE,
} from '../../../constants';
import { PATH_HOME, PATH_TUTOR } from '../../../constants/routes.ts';

const { Sider } = Layout;

import { GlobalStateContext } from '../../../context/GlobalContext.tsx';
import { OrganizationResponse } from '../../../api/types.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartSimple, faClipboard, faEye, faUserLarge } from '@fortawesome/free-solid-svg-icons';
// import { or } from 'firebase/firestore';
// interface MenuItemType {
//   key: number;
//   label: string;
//   // antd icon
//   // icon: any;
// }

// const items: MenuItemType[] = [
//   {
//     key: 1,
//     label: 'University of Colombo School of Computing',
//     // icon: BankOutlined,
//   },
//   {
//     key: 2,
//     label: 'Institute of Java and Software Engineering',
//     // icon: BankOutlined,
//   },
//   {
//     key: 3,
//     label: 'Ocean University of Sri Lanka',
//     // icon: BankOutlined,
//   },
// ];

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

// ExamSetter items
const examSetterPersonal: MenuProps['items'] = [
  getItem(
    <Link to={PATH_TUTOR.dashboard}>DashBoard</Link>,
    'projects', <FontAwesomeIcon icon={faChartSimple}/>
  ),
  // getItem('Organizations', 'organizations', <BankOutlined />, [
  //   getItem(<Link to={'organization'}>Organization 1</Link>, 'Org', null),
  // ]),
  getItem('Exams', 'exams', <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>, [
    getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
    getItem(
      <Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>,
      'new_exam',
      null
    ),
    
  ]),

  getItem(<Link to={PATH_TUTOR.dashboard}>Grading</Link>,'Grading',<FontAwesomeIcon icon={faClipboard}/>),
  getItem(<Link to={PATH_TUTOR.dashboard}>Proctoring</Link>,'Grading',<FontAwesomeIcon icon={faEye}/>),
  // getItem('Results', 'results', <BarChartOutlined />, [
  //   getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
  //   getItem(<Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>, 'new_exam', null),
  //   getItem(<Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>, 'grading', null),
  // ]),
  getItem('User profile', 'user-profile', <FontAwesomeIcon icon={faUserLarge}/>, [
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

// const ExamSetterOrganization: MenuProps['items'] = [
//   getItem(
//     <Link to={PATH_ORG_ADMIN.dashboard}>DashBoard</Link>,
//     'projects',
//     null
//   ),

//   getItem('Exams', 'exams', <BankOutlined />, [
//     getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
//     getItem(
//       <Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>,
//       'new_exam',
//       null
//     ),
//     getItem(
//       <Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>,
//       'grading',
//       null
//     ),
//   ]),
// ];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ organization, organizations, ...others }: SideNavProps | any) => {
  const globalContext = useContext(GlobalStateContext);

  if (!globalContext) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  // const { state, setState } = globalContext;

  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    organization ? organization : 'Select Organization'
  );

  useEffect(() => {
    if (organization) {

      // show only the first 10 characters of the organization name
      if (organization.length > 15) {
        organization = organization.substring(0, 10) + '...';
      }

      setSelectedOption(organization);
    }
  }, [organization]);

  // set the state of the role as either examSetter or orgadmin
  // const [isRole, setIsRole] = useState('examSetter');

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

  const handleMenuClick = (e: any) => {
    const selectedItem = organizations.find((item:OrganizationResponse) => item.id === parseInt(e.key));
    if (selectedItem) {
      let orgName = selectedItem.firstName;
      if (orgName.length > 15) {
        orgName = orgName.substring(0, 15) + '...';
      }
      setSelectedOption(orgName);
    }
    console.log('selectedItem', selectedItem);
  };

  useEffect(()=>{
    console.log('organizations:', organizations)
  },[organizations])

  const menu = (
    <Menu onClick={handleMenuClick}>
      {organizations.map((org:OrganizationResponse) => (
        <Menu.Item key={org.id}>
          {org.firstName.length > 15 ? org.firstName.substring(0, 15) + '...' : org.firstName}
        </Menu.Item>
      ))}
    </Menu>
  );
  

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  // useEffect(() => {
  //   if (pathname.includes('org-admin')) {
  //     setIsRole('org-admin');
  //   } else if (pathname.includes('examSetter')) {
  //     setIsRole('examSetter');
  //   } else if (pathname.includes('candidate')) {
  //     setIsRole('candidate');
  //   }
  // }, [pathname, state]);

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
      <ConfigProvider>
        <Flex align="center" justify="center">

          <Dropdown overlay={menu} placement="bottom">
            <Button>{selectedOption}</Button>
          </Dropdown>
        </Flex>

        {/* {isRole === 'examSetter' && state.loginAs === 'Personal' && ( */}
          <Menu
            mode="inline"
            items={examSetterPersonal}
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            style={{ border: 'none' }}
          />
        {/* )} */}
        {/* {isRole === 'examSetter' && state.loginAs === 'Organization' && (
          <Menu
            mode="inline"
            items={ExamSetterOrganization}
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            style={{ border: 'none' }}
          />
        )} */}
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
