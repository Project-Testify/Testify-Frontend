/* eslint-disable @typescript-eslint/no-explicit-any */
import {

  Col,
  Flex,

  Row,
  theme,
  Typography,
} from 'antd';

import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';

import {Candidate} from './forms/Candidate';
import { Organization } from './forms/Organization';
import { Tutor } from './forms/Tutor';
import { Select } from './forms/Select';

import { Route, Routes } from 'react-router-dom';


const { Title, Text } = Typography;



export const SignUpPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });



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
            Welcome to Testify
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Lets start your journey with our secure and seamless online
            exams.
          </Text>
        </Flex>
      </Col>

      <Col xs={24} lg={12}>


        {/* <User /> */}
        {/* <Select /> */}

        <Routes>
        <Route path="/student" element={<Candidate />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/educator" element={<Tutor />} />

        <Route path="/" element={<Select />} />

      </Routes>
       


      </Col>
    </Row>
  );
};
