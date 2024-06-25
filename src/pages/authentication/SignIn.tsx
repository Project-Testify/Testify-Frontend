/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { PATH_AUTH} from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PATH_USER_PROFILE, PATH_DASHBOARD } from '../../constants/routes';

import {loginService} from '../../api/services/auth';
import { useAuth } from '../../hooks/useAuth';




const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = () => {


  const {login} = useAuth();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {


    loginService(values).then((res) => {
      console.log(res);

      if (res.status === 200) {
        console.log('Success:', res.data);
        setLoading(true);


        login(res.data);




        message.open({
          type: 'success',
          content: 'Login successful',
        });

        setTimeout(() => {

          // navigate according to user role
          if (res.data.role === 'ATTENDEE') {
            navigate(PATH_USER_PROFILE.details);
          }
          if (res.data.role === 'ORGANIZATION') {
            navigate(PATH_DASHBOARD.org_admin);
          }
          if (res.data.role === 'EXAMSETTER') {
            navigate(PATH_DASHBOARD.org_admin);
          }
         
        }, 1000);
      } else {
        message.open({
          type: 'error',
          content: 'Login failed',
        });
      }
    }
    ).catch((error) => {
      console.log('Failed:', error);
    });

 

    // setTimeout(() => {
      // navigate(PATH_ORG_ADMIN.dashboard);
    // }, 5000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: '100%', padding: '1rem' }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Welcome back to Testify
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Log in to start your journey with our secure and seamless online
            exams.
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Login</Title>
          <Flex gap={4}>
            <Text>Don't have an account?</Text>
            <Link href={PATH_AUTH.signup}>Create an account here</Link>
          </Flex>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }} 
            // initialValues={{
            //   email: 'demo@email.com',
            //   password: 'demo123',
            //   remember: true,
            // }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Continue
                </Button>
                <Link href={PATH_AUTH.passwordReset}>Forgot password?</Link>
              </Flex>
            </Form.Item>
          </Form>
          <Divider className="m-0">or</Divider>
          <Flex
            vertical={isMobile}
            gap="small"
            wrap="wrap"
            style={{ width: '100%' }}
          >
            <Button icon={<GoogleOutlined />}>Sign in with Google</Button>
            <Button icon={<FacebookFilled />}>Sign in with Facebook</Button>
            <Button icon={<TwitterOutlined />}>Sign in with Twitter</Button>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};
