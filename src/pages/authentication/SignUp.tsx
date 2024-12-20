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

import { Candidate } from './forms/Candidate';
import { Organization } from './forms/Organization';
import { ExamSetter } from './forms/ExamSetter';
import { Select } from './forms/Select';

import { Route, Routes, useSearchParams } from 'react-router-dom';
// import { Flex } from '../../../template/src/components/Flex/Flex';


const { Title, Text } = Typography;


export const SignUpPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('invitation');

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
          <Route path="/" element={<Select />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/examSetter" element={<ExamSetter token={token||''} />} />
        </Routes>

      </Col>
    </Row>
  );
};
