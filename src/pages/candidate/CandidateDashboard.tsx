import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { Helmet } from 'react-helmet-async';
import { assets } from '../../assets';
import { ExamStatCard } from '../../components';
import {
  Col,
  Row,
  Calendar,
  Table,
  Tag,
  Typography,
  Card,
  Flex,
  Image,
} from 'antd';
import { getLoggedInUser } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CandidateDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = getLoggedInUser();
  const candidateName = user?.firstName;
  const navigate = useNavigate();

  // Example API call simulation
  useEffect(() => {
    const checkOngoingExam = async () => {
      const userString = sessionStorage.getItem('user'); // Retrieve the user string
      const token = sessionStorage.getItem('accessToken'); // Retrieve the access token
  
      if (!userString || !token) {
        console.error("User information or token not found in session storage.");
        return;
      }
  
      const user = JSON.parse(userString); // Parse the user object
      const candidateId = user?.id; // Extract the candidateId
  
      if (!candidateId) {
        console.error("Candidate ID not found in user object.");
        return;
      }
  
      try {
        const response = await axios.post(
          'http://localhost:8080/api/v1/candidate/check-active-session',
          { candidateId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = response.data;
        if (data.examId && data.examName && data.examType) {
          // If an active exam session exists, show the modal
          setIsModalVisible(true);
          // Store the exam data for navigation
          sessionStorage.setItem('ongoingExam', JSON.stringify(data));
          sessionStorage.setItem('sessionId', data.sessionId);
          sessionStorage.setItem('endTime', data.endTime);
        }
      } catch (error) {
        console.error('Error checking active session:', error);
      }
    };
  
    checkOngoingExam();
  }, []);
  
  const handleOk = () => {
    const ongoingExam = sessionStorage.getItem('ongoingExam');
    if (ongoingExam) {
      const { examId, examName, examType } = JSON.parse(ongoingExam);
      navigate('/candidate/exam/view', { state: { id: examId, name: examName, type: examType } });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const examData = [
    { type: 'Ongoing', value: 5 },
    { type: 'Upcoming', value: 3 },
    { type: 'Completed', value: 10 },
  ];

  const participationData = [
    { date: '2023-07-01', count: 5 },
    { date: '2023-07-02', count: 3 },
    { date: '2023-07-03', count: 7 },
    { date: '2023-07-04', count: 6 },
    { date: '2023-07-05', count: 8 },
    { date: '2023-07-06', count: 4 },
    { date: '2023-07-07', count: 9 },
  ];

  // Exam table
  const columns = [
    {
      title: 'Exam Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Organization Name',
      dataIndex: 'orgName',
      key: 'orgName',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: any) => (
        <>
          {status.map((tag: string) => {
            let color = 'green';
            if (tag === 'upcoming') {
              color = 'volcano';
            } else if (tag === 'ongoing') {
              color = 'geekblue';
            } else if (tag === 'complete') {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      orgName: 'UCSC',
      startDate: '2024-07-01',
      status: ['ongoing'],
    },
    {
      key: '2',
      name: 'Jim Green',
      orgName: 'SLIIT',
      startDate: '2024-07-01',
      status: ['upcoming'],
    },
    {
      key: '3',
      name: 'Joe Black',
      orgName: 'NSBM',
      startDate: '2024-07-01',
      status: ['complete'],
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Candidate Dashboard</title>
      </Helmet>

      <Modal
        title="Ongoing Exam"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} style={{ width: '100px' }}>
            Cancel
          </Button>,
          <Button key="proceed" type="primary" onClick={handleOk} style={{ width: '100px' }}>
            Go to Exam
          </Button>,
        ]}
        centered
        width={600}
        style={{
          fontFamily: 'Arial, sans-serif',
        }}
        bodyStyle={{
          padding: '20px',
          fontSize: '20px',
          color: '#333',
        }}
      >
        <Typography.Text>
          You have an ongoing exam. Would you like to continue and view the exam details?
        </Typography.Text>
      </Modal>

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 20, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 20 },
        ]}
      >
        <Col lg={24}>
          <Card
            style={{
              background: `url(${assets.background}) no-repeat center center`,
              backgroundPosition: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Flex align="center">
              <Typography.Title level={1}>
                Welcome, {candidateName}
              </Typography.Title>
            </Flex>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <ExamStatCard data={examData} chartType={'bar'} />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <ExamStatCard data={participationData} chartType={'line'} />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Calendar fullscreen={false} />
        </Col>

        <Col lg={16}>
          <Table columns={columns} dataSource={data} />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Flex justify="space-between" align="center">
              <Typography.Title level={5}>Your Badges</Typography.Title>
              <Typography.Title level={4}>3</Typography.Title>
            </Flex>
            <Flex justify="space-berween" align="center">
              <Image src={assets.badge} preview={false} />
              <Image src={assets.badge} preview={false} />
              <Image src={assets.badge} preview={false} />
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
