/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Button,
  Col,
  Flex,
  Form,
  message,
  UploadProps,
  Upload,
  Divider,
  Input,
  Row,
} from 'antd';
import { GoogleOutlined, InboxOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PATH_AUTH } from '../../../constants/routes';

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
  verificationDocuments?: FileList;
};

import { registerOrganization } from '../../../api/services/auth';
import { Typography } from 'antd';

export const Organization = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State to hold uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onFinish = async (values: FieldType) => {
    console.log('Success:', values);
    setLoading(true);

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append('role', 'ORGANIZATION');
      formData.append('firstName', values.firstName || '');
      formData.append('email', values.email || '');
      formData.append('contactNo', values.contactNo || '');
      formData.append('addressLine1', values.addressLine1 || '');
      formData.append('addressLine2', values.addressLine2 || '');
      formData.append('city', values.city || '');
      formData.append('state', values.state || '');
      formData.append('website', values.website || '');
      formData.append('password', values.password || '');
      formData.append('cPassword', values.cPassword || '');
      formData.append('terms', values.terms ? 'true' : 'false');

      // Append files to formData
      uploadedFiles.forEach((file, index) => {
        formData.append('verificationDocuments', file);
      });

      // Send formData to the backend
      const response = await registerOrganization(formData);
      console.log(response);

      if (response.status === 200) {
        message.success('Account signup successful');
        if (values.email) {
          navigate(
            `${PATH_AUTH.verifyEmail}?email=${encodeURIComponent(values.email)}`
          );
        } else {
          message.error('Email is required for verification.');
        }
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

  const { Dragger } = Upload;

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    beforeUpload: (file) => {
      setUploadedFiles((prevFiles) => [...prevFiles, file]);
      return false; // Prevent automatic upload
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Flex
      vertical
      align={isMobile ? 'center' : 'flex-start'}
      justify="center"
      gap="middle"
      style={{ height: '100%', padding: '2rem' }}
    >
      {/* Form and other UI components */}
      <Link to="/auth/signup"> &lt;Back </Link>

      <Typography.Title className="m-0">
        Create an account As an Organization
      </Typography.Title>
      <Flex gap={4}>
        <Typography.Text>Already have an account?</Typography.Text>
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Other Form Fields */}
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
            <Form.Item<FieldType> label="AddressLine2" name="addressLine2">
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

          {/* File Upload */}
          <Col xs={24}>
            <Form.Item<FieldType>
              label="Upload Verification Documents"
              name="verificationDocuments"
              rules={[
                {
                  required: true,
                  // message: 'Please add your verification documents',
                  // allow a maximum of 5 files to be uploaded and show a validation error if more than 5 files are uploaded

                  // validator: (_, value) => {
                  //   if (!value) {
                  //     return Promise.reject(
                  //       new Error('Please add your verification documents')
                  //     );
                  //   }
                  //   // if (value.length <= 5) {
                  //   //   console.log('value', value);
                  //   //   return Promise.resolve();
                  //   // } else{
                  //   //   return Promise.reject(
                  //   //     new Error('You can only upload a maximum of 5 files')
                  //   //   );
                  //   // }
                  // }
                },
              ]}
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                  Only <b>.png, .jpg, .jpeg, .pdf</b> files are allowed.
                  Maximum of <b>5 files</b> allowed.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
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
