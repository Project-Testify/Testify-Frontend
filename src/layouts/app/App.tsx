import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Input,
  Layout,
  MenuProps,
  message,
  theme as antdTheme,
  Tooltip,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import SideNav from './SideNav.tsx';
import HeaderNav from './HeaderNav.tsx';
import FooterNav from './FooterNav.tsx';
import { NProgress, TogglerDarkTheme } from '../../components';
import { PATH_LANDING } from '../../constants';
import ThemeContext from '../../hooks/ThemeProvider.tsx';

import { useAuth } from '../../hooks/useAuth.tsx';

const { Content } = Layout;


type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  
  const {
    token: { borderRadius },
  } = antdTheme.useToken();
  
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  const [profileImage ,  setProfileImage] = useState('https://avatars.githubusercontent.com/u/29647600?v=4');

  // check if the url has contains the word 'admin'
  // if(location.pathname.includes('org-admin')){
  //   setProfileImage('https://avatars.githubusercontent.com/u/29647600?v=4');
  // }
  // if(location.pathname.includes('candidate')){
  //   setProfileImage('/public/me.jpg');
  // }

  useEffect(() => {
    if (location.pathname.includes('org-admin')) {
      setProfileImage('/public/orgnaization.png');
    } else if (location.pathname.includes('candidate')) {
      setProfileImage('/public/nirmal.jpg');
    }
  }, [location.pathname]);


  const { logout } = useAuth();
  

  const items: MenuProps['items'] = [
    {
      key: 'user-profile-link',
      label: 'profile',
      icon: <UserOutlined />,
    },
    {
      key: 'user-settings-link',
      label: 'settings',
      icon: <SettingOutlined />,
    },
    {
      key: 'user-help-link',
      label: 'help center',
      icon: <QuestionOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'user-logout-link',
      label: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        message.open({
          type: 'loading',
          content: 'signing you out',
        });

        setTimeout(() => {

          logout();

          navigate(PATH_LANDING.root);
        }, 1000);
      },
    },
  ];


  // get theme from antd theme context
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout
        style={{
          minHeight: '100vh',
          // backgroundColor: '#f0f2f5',
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value: boolean) => setCollapsed(value)}
          theme={'light'}
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            // background: '#f0f2f5',
            border: 'none',
            transition: 'all .2s',
          }}
        />
        
        <Layout
          // style={{
          //   background: theme === 'dark' ? '#001529' : 'none',
          //   }}
          >
            <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : '200px',
              padding: '0 2rem 0 0',
              background: theme === 'dark' ? 'rgba(0, 0, 0, 0.05)' : (navFill ? 'rgba(255, 255, 255, .5)' : 'none'),
              backdropFilter: navFill ? 'blur(8px)' : 'none',
              boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: 'all .25s',
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? 'Expand' : 'Collapse'} Sidebar`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              </Tooltip>
              <Input.Search
                placeholder="search"
                style={{
                  width: isMobile ? '100%' : '400px',
                  marginLeft: isMobile ? 0 : '.5rem',
                }}
                size="middle"
              />
            </Flex>
            <Flex align="center" gap="small">
              <TogglerDarkTheme />
{/* 
              <Tooltip title="Apps">
                <Button icon={<AppstoreOutlined />} type="text" size="large" />
              </Tooltip> */}
              <Tooltip title="Messages">
                <Button icon={<BellOutlined />} type="text" size="large" />
              </Tooltip>
              <Dropdown menu={{ items }} trigger={['click']}>
                <Flex>
                  <img
                    src={profileImage}
                    alt="user profile photo"
                    height={36}
                    width={36}
                    style={{ borderRadius, objectFit: 'cover' }}
                  />
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : '200px'}`,
              // background: '#ebedf0',
              borderRadius: collapsed ? 0 : borderRadius,
              transition: 'all .25s',
              padding: '24px 32px',
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: 'none' }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <FooterNav
            style={{
              textAlign: 'center',
              marginLeft: collapsed ? 0 : '200px',
              background: 'none',
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};
