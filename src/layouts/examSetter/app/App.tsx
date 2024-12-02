import {
  Button,
  Card,
  Dropdown,
  Flex,
  FloatButton,
  Input,
  Layout,
  MenuProps,
  message,
  Modal,
  theme,
  Typography,
  Tooltip,
  Space,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  AppstoreOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
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
import { NProgress } from '../../../components';
import { PATH_LANDING } from '../../../constants';
import { getLoggedInUser } from '../../../utils/authUtils.ts';
import { OrganizationResponse } from '../../../api/types.ts';
import { AxiosResponse } from 'axios';
import { getExamSetterOrganizations } from '../../../api/services/ExamSetter.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';

const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);

  // const organization = getOrganaization();
  const organization = undefined;
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return;
  }
  const setterId = loggedInUser.id;

  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationResponse | null>(null);
  const [setterOrganizations, setSetterOrganizations] = useState<OrganizationResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSetterOrganizations = async() => {
    try{
      const response: AxiosResponse<OrganizationResponse[], any> = await getExamSetterOrganizations(setterId);
      setSetterOrganizations(response.data);
    }catch{
      console.log('error fetching setter organizations');
    }
  }

  useEffect(() => {
    if (organization === undefined) {
      setIsModalOpen(true);
    }
    getSetterOrganizations();
  }, []);

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
          navigate(PATH_LANDING.root);
        }, 1000);
      },
    },
  ];

  const handleOrganizationClick = (org: OrganizationResponse) => {
    // setOrganization(org);
    setSelectedOrganization(org);
    sessionStorage.setItem('orgId',org.id.toString());
    
    setIsModalOpen(false);
  };

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
          backgroundColor: 'white',
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value: boolean) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: 'none',
            border: 'none',
            transition: 'all .2s',
          }}
          organization={selectedOrganization?.firstName}
          organizations={setterOrganizations}
        />
        <Layout
          style={{
            background: 'none',
          }}
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : '200px',
              padding: '0 2rem 0 0',
              background: navFill ? 'rgba(255, 255, 255, .5)' : 'none',
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
              <Tooltip title="Apps">
                <Button icon={<AppstoreOutlined />} type="text" size="large" />
              </Tooltip>
              <Tooltip title="Messages">
                <Button icon={<MessageOutlined />} type="text" size="large" />
              </Tooltip>
              <Dropdown menu={{ items }} trigger={['click']}>
                <Flex>
                  <img
                    src="/me.jpg"
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
              background: '#ebedf0',
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

          <Modal
            title="Please Select Organization"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            width="30vw"
          >
            <Flex justify="center">
              <Space direction="vertical">
                {setterOrganizations.map((org) => (
                  <>
                    <div
                      key={org.id}
                      onClick={() => handleOrganizationClick(org)}
                      style={{ cursor: 'pointer', scale: '0.8'}}
                    >
                      
                        
                          <Card key={org.id} hoverable>
                            <Flex
                              align="center"
                              style={{ marginBottom: '20px' }}
                            >
                              {/* <Image
                                src={org.img}
                                style={{ width: '50%' }}
                                preview={false}
                              /> */}
                              <FontAwesomeIcon icon={faSchool} fontSize={'40px'} style={{margin:'10px'}} color='#6f7ae8'></FontAwesomeIcon>
                              <Typography.Title level={3}>
                                {org.firstName}
                              </Typography.Title>
                            </Flex>
                          </Card>
                    </div>
                  </>
                ))}
              </Space>
            </Flex>
          </Modal>
        </Layout>
      </Layout>
    </>
  );
};
