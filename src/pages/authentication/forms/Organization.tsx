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
  
    Typography,
  } from 'antd';
  import {
    GoogleOutlined,
  } from '@ant-design/icons';
  import { useMediaQuery } from 'react-responsive';
  import { PATH_AUTH} from '../../../constants';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  import { PATH_ORG_ADMIN } from '../../../constants/routes';
  
  const { Title, Text, Link } = Typography;
  
  type FieldType = {
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
    cPassword?: string;
    terms?: boolean;

    
  };


export const Organization = () => {


      const isMobile = useMediaQuery({ maxWidth: 769 });
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
    
      const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoading(true);
    
        message.open({
          type: 'success',
          content: 'Account signup successful',
        });
    
        // setTimeout(() => {
          navigate(PATH_ORG_ADMIN.dashboard);
        // }, 5000);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };



    return (
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', padding: '2rem' }}
        >
                    <Link href='/auth/signup'> &lt;Back </Link>


          <Title className="m-0">Create an account As an Organization</Title>
          <Flex gap={4}>
            <Text>Already have an account?</Text>
            <Link href={PATH_AUTH.signin}>Sign in here</Link>
          </Flex>
          <Flex
            vertical={isMobile}
            gap="small"
            wrap="wrap"
            style={{ width: '100%' }}
          >
            <Button icon={<GoogleOutlined />}>Sign up with Google</Button>
          </Flex>
          <Divider className="m-0">or</Divider>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Organization Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your organization name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

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
                  label="Mobile"
                  name="mobile"
                  rules={[
                    { required: true, message: 'Please input your mobile number' },
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
                <Form.Item<FieldType>
                  label="Confirm password"
                  name="cPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please ensure passwords match!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="terms" valuePropName="checked">
                  <Flex>
                    <Checkbox>I agree to</Checkbox>
                    <Link>terms and conditions</Link>
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          
        </Flex>
    )
    }