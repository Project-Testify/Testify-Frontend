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
    Modal,
    Row,
  
    Typography,
  } from 'antd';
  import {
    GoogleOutlined,
  } from '@ant-design/icons';
  import { useMediaQuery } from 'react-responsive';
  import { PATH_AUTH} from '../../../constants';
  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  
  const { Title, Text } = Typography;

  import { Link } from 'react-router-dom';
  
  type FieldType = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    cPassword?: string;
    terms?: boolean;
    contactNo?: string;
  };

import { registerExamSetter } from '../../../api/services/auth';
import { addExamSetter, checkSetterRegistration, getExamSetterOrganizations } from '../../../api/services/ExamSetter';
import { OrganizationResponse } from '../../../api/types';
import { AxiosResponse } from 'axios';

type Props = {
  token: string 
} 

export const ExamSetter = ({token}:Props) => {

      
      const isMobile = useMediaQuery({ maxWidth: 769 });
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
      const [setterId, setSetterId] = useState(0);
      const [setterOrganizations, setSetterOrganizations] = useState<OrganizationResponse[]>([]);
      const [showModal, setShowModal] = useState(false);

      const SetterRegistration = async() => {
          try{
            const response = await checkSetterRegistration(token);
            setSetterId(response.data);
          }catch{
            console.log('error fetching from checkSetterRegistration');
          }
      }

      const getSetterOrganizations = async() => {
        try{
          const response: AxiosResponse<OrganizationResponse[], any> = await getExamSetterOrganizations(setterId);
          setSetterOrganizations(response.data);
        }catch{
          console.log('error fetching setter organizations');
        }
      }
      
      useEffect(() => {
        SetterRegistration();
      }, [token]);
    
      useEffect(() => {
        if (setterId !== 0) {
          getSetterOrganizations();
          setShowModal(true);
        }
      }, [setterId]);

      const handleAddOrganization = async() => {
        try{
          await addExamSetter(token);
          setShowModal(false);
          message.success('You were added to organization');
          navigate(`${PATH_AUTH.signin}`);
        } catch{
          console.log("setter cannot add");
        }
      }

      // const [searchParams] = useSearchParams();
      // const token = searchParams.get('invitation');

    
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

        // set role
        values.role = 'EXAMSETTER';
        values.token = token;
    
        try {
          const response = await registerExamSetter(values);
          console.log(response);
          message.success('Account signup successful');
          navigate(`${PATH_AUTH.verifyEmail}?email=${encodeURIComponent(values.email)}`);
        } catch (error) {
          console.log(error);
          message.error('An error occurred. Please try again');
        } finally {
          setLoading(false);
        }
      };
    

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      //verify the identity of the setter, because the invitation is sent by an organization, make the invitation accepeted flag=true
      // useEffect(() => {
      //   if (token) {
      //     confirmExamSetterToken(token)
      //       .then(response => {
      //         console.log('Token verified:', response.data);
      //         message.success("Access verified")
      //       })
      //       .catch(error => {
      //         message.error('Invalid or expired invitation link');
      //       });
      //   }
      // }, [token]);



    return (
      <div>
        <Modal
        title="Existing Organizations"
        visible={showModal}
        onOk={handleAddOrganization}
        onCancel={() => setShowModal(false)}
        okText="Add New Organization"
      >
        <p>You are already registered with the following organizations:</p>
        <ul>
          {setterOrganizations.map((org) => (
            <li>{org.firstName}</li>
          ))}
        </ul>
        <p>Would you like to add this new organization to your account?</p>
      </Modal>

        
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', padding: '2rem' }}
        >

          {/* Back button */}
          <Link to='/auth/signup'> &lt;Back </Link>
          
          <Title className="m-0">Create an account as an ExamSetter</Title>
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
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="First name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name!',
                    },
                  ]}
                >
                  <Input name="firstName"/>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="Last name"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please input your last name!' },
                  ]}
                >
                  <Input  name="password"/>
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
                  <Input name="email"/>
                </Form.Item>
              </Col>

              {/* contactNo */}
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Mobile"
                  name="contactNo"
                  rules={[
                    { required: true, message: 'Please input your mobile number' },
                  ]}
                >
                  <Input name='contactNo'/>
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
                  <Input.Password  name="password"/>
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
                    <Link to="">terms and conditions</Link>
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
      </div>
    )
    }