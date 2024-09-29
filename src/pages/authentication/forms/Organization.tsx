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
import { GoogleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PATH_AUTH } from '../../../constants/routes';

const { Title, Text } = Typography;

import { Link } from 'react-router-dom';

type FieldType = {
  firstName?: string;
  email?: string;
  contactNo?: string;
  password?: string;
  cPassword?: string;
  terms?: boolean;
  city?: string;
  state?: string;
  addressLine1?: string;
  addressLine2?: string;
  website?: string;
};

import { registerOrganization } from '../../../api/services/auth';
import { Tooltip } from 'antd';

export const Organization = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  //   setLoading(true);

  //   message.open({
  //     type: 'success',
  //     content: 'Account signup successful',
  //   });

  //   // setTimeout(() => {
  //     navigate(PATH_ORG_ADMIN.dashboard);
  //   // }, 5000);
  // };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    setLoading(true);

    // set role to ORGANIZATION
    values.role = 'ORGANIZATION';

    try {
      const response = await registerOrganization(values);
      console.log(response);
      if (response.status === 200) {
        message.success('Account signup successful');
        // navigate(PATH_ORG_ADMIN.dashboard);
        // navigate(PATH_AUTH.verifyEmail);
        navigate(
          `${PATH_AUTH.verifyEmail}?email=${encodeURIComponent(values.email)}`
        );
      } else {
        message.error('Account signup failed');
      }
    } catch (error) {
      message.error('Account signup failed');
    }
    setLoading(false);
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
      <Link to="/auth/signup"> &lt;Back </Link>

      <Title className="m-0">Create an account As an Organization</Title>
      <Flex gap={4}>
        <Text>Already have an account?</Text>
        <Link to={PATH_AUTH.signin}>Sign in here</Link>
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
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please input your organization name!',
                },
              ]}
            >
              <Input name="firstName" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input name="email" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item<FieldType>
              label="Mobile"
              name="contactNo"
              rules={[
                { required: true, message: 'Please input your mobile number' },
              ]}
            >
              <Input name="contactNo" />
            </Form.Item>
          </Col>

          {/* AddressLine1 */}
          <Col xs={24}>
            <Form.Item<FieldType>
              label="AddressLine1"
              name="addressLine1"
              rules={[{ required: true, message: 'Please input your adress' }]}
            >
              <Input name="city" />
            </Form.Item>
          </Col>

          {/* AddressLine2 */}
          <Col xs={24}>
            <Form.Item<FieldType>
              label="AddressLine2"
              name="addressLine2"
            >
              <Input name="city" />
            </Form.Item>
          </Col>         

          {/* City */}
          <Col xs={24}>
            <Form.Item<FieldType>
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city' }]}
            >
              <Input name="city" />
            </Form.Item>
          </Col>

          {/* State */}
          <Col xs={24}>
            <Form.Item<FieldType>
              label="State"
              name="state"
              rules={[{ required: true, message: 'Please input your state' }]}
            >
              <Input name="state" />
            </Form.Item>
          </Col>


          {/* Website */}
          <Col xs={24}>
            <Form.Item<FieldType>
              label="Website"
              name="website"
              rules={[{ required: true, message: 'Please input your Website' }]}
            >
              <Input name="state" />
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
              <Input.Password name="password" />
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
            <Row>
              <Col xs={12}>
                <Form.Item<FieldType> name="terms" valuePropName="checked">
                  <Flex align="center">
                    <Checkbox>I agree to</Checkbox>
                    <Link to="">terms and conditions</Link>
                  </Flex>
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item<FieldType> name="verify" valuePropName="checked">
                  <Flex align="center">
                    <Tooltip title="Verify your organization to get the Verifed Badge. This has to be done by the admin so it will take 2 to 3 days.">
                    <Checkbox>Verify my Organization</Checkbox>
                    </Tooltip>
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
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
  );
};
