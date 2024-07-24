import React, { useEffect, useRef, useState, useContext } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps, Dropdown, Button, Flex } from 'antd';
import {
  UserOutlined,
  BankOutlined,
} from '@ant-design/icons';

import { Logo } from '../../../components';
import { Link, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_EXAM, PATH_USER_PROFILE } from '../../../constants';
import { PATH_HOME } from '../../../constants/routes.ts';

const { Sider } = Layout;

import { GlobalStateContext } from '../../../context/GlobalContext.tsx';
interface MenuItemType {
  key: string;
  label: string;
  // Add other properties if necessary
}

const items: MenuItemType[] = [
  {
    key: '1',
    label: 'Personal Account',
  },
  {
    key: '2',
    label: 'Organization 1',
  },
  {
    key: '3',
    label: 'Organization 2',
  },
];

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
    <Link to={PATH_DASHBOARD.org_admin}>DashBoard</Link>,
    'projects',
    null
  ),
  // getItem('Organizations', 'organizations', <BankOutlined />, [
  //   getItem(<Link to={'organization'}>Organization 1</Link>, 'Org', null),
  // ]),
  getItem('Exams', 'exams', <BankOutlined />, [
    getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
    getItem(<Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>, 'new_exam', null),
    getItem(<Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>, 'grading', null),
  ]),
  // getItem('Results', 'results', <BarChartOutlined />, [
  //   getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
  //   getItem(<Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>, 'new_exam', null),
  //   getItem(<Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>, 'grading', null),
  // ]),
  getItem('User profile', 'user-profile', <UserOutlined />, [
    getItem(<Link to={PATH_USER_PROFILE.details}>Details</Link>, 'details', null),
    getItem(<Link to={PATH_USER_PROFILE.preferences}>Preferences</Link>, 'preferences', null),
    getItem(<Link to={PATH_USER_PROFILE.personalInformation}>Information</Link>, 'information', null),
    getItem(<Link to={PATH_USER_PROFILE.security}>Security</Link>, 'security', null),
    getItem(<Link to={PATH_USER_PROFILE.activity}>Activity</Link>, 'activity', null),
    getItem(<Link to={PATH_USER_PROFILE.action}>Actions</Link>, 'actions', null),
    getItem(<Link to={PATH_USER_PROFILE.help}>Help</Link>, 'help', null),
    getItem(<Link to={PATH_USER_PROFILE.feedback}>Feedback</Link>, 'feedback', null),
  ]),
];

const ExamSetterOrganization: MenuProps['items'] = [
  getItem(
    <Link to={PATH_DASHBOARD.org_admin}>DashBoard</Link>,
    'projects',
    null
  ),

  getItem('Exams', 'exams', <BankOutlined />, [
    getItem(<Link to={PATH_EXAM.exam}>All Exams</Link>, 'all_exams', null),
    getItem(<Link to={PATH_EXAM.exam + '/new'}>New Exams</Link>, 'new_exam', null),
    getItem(<Link to={PATH_EXAM.exam + '/grading'}>Grading</Link>, 'grading', null),
  ]),

];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const globalContext = useContext(GlobalStateContext);

  if (!globalContext) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  const { state, setState } = globalContext;

  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');
  const [selectedOption, setSelectedOption] = useState('Apps');

  // set the state of the role as either examSetter or orgadmin
  const [isRole, setIsRole] = useState('examSetter');

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
    // Assume items is of a certain type that has a key and label
    const selectedItem = items.find((item) => item.key === e.key) as MenuItemType | undefined;
  
    // Check if selectedItem is defined and has a label
    if (selectedItem && 'label' in selectedItem) {
      setSelectedOption(selectedItem.label as string);
    }
  
    // setState of loginAs
    if (e.key === '1') {
      setState({ ...state, loginAs: 'Personal' });
    } else {
      setState({ ...state, loginAs: 'Organization' });
    }
  };
  

  const menu = (
    <Menu onClick={handleMenuClick} items={items} />
  );

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
    } else if (pathname.includes('candidate')) {
      setIsRole('candidate');
    }
  }, [pathname,state]);

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

        {isRole === 'examSetter' && state.loginAs === 'Personal' && (
          <Menu
            mode="inline"
            items={examSetterPersonal}
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            style={{ border: 'none' }}
          />
        )}
        {isRole === 'examSetter' && state.loginAs === 'Organization' && (
          <Menu
            mode="inline"
            items={ExamSetterOrganization}
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
