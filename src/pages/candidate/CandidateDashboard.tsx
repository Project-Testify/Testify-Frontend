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
  Tooltip,
} from 'antd';
import { getLoggedInUser } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCandidateExams } from '../../api/services/candidate';
import { Exam } from '../../types';
import moment from 'moment';
import { render } from 'react-dom';
import { toLower } from 'lodash';

export const CandidateDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [exams, setExams] = useState<any>([]);
  const [data, setData] = useState<any>([]);
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




  // Fetch candidate exams
  useEffect(() => {
    const fetchCandidateExams = async () => {
      const response = await getCandidateExams();
      if (response.status === 200) {
        setExams(response.data);
      }
    };
    fetchCandidateExams();
  }, []);

  // Transform exams into table data
  useEffect(() => {
    const datatable = exams.map((exam: any) => ({
      key: exam.id,
      title: exam.title,
      orgName: exam.organization.name,
      startDate: moment(exam.startTime).format('YYYY-MM-DD'),
      status: exam.status, // Uncomment or update logic as needed
    }));
    setData(datatable);
  }, [exams]);


  // get the data for the exam stat card
  const examData = [
    { type: 'Ongoing', value: exams.filter((exam: any) => toLower(exam.status) === 'ongoing').length },
    { type: 'Upcoming', value: exams.filter((exam: any) => toLower(exam.status) === 'upcoming').length },
    { type: 'Completed', value: exams.filter((exam: any) => toLower(exam.status) === 'complete').length },
  ];




  console.log(data);
  console.log(exams);

  const dateCellRender = (value: moment.Moment) => {
    const dateString = value.format('YYYY-MM-DD');
    const examOnDate = exams.filter(
      (exam) => moment(exam.startTime).format('YYYY-MM-DD') === dateString
    );
    //"2024-12-16T02:30" === "2024-12-16" do the convertion

    if (examOnDate.length > 0) {
      return (
        <Tooltip
          title={
            <ul style={{ margin: 0, padding: 0 }}>
              {examOnDate.map((exam) => (
                <li key={exam.name} style={{ listStyle: 'none' }}>
                  {exam.title}
                </li>
              ))}
            </ul>
          }
        >
          <div
            style={{
              backgroundColor: '#6d76ed',
              borderRadius: '4px',
              padding: '2px',
              textAlign: 'center',
            }}
          ></div>
        </Tooltip>
      );
    }

    return null;
  };

  const columns = [
    {
      title: 'Exam Name',
      dataIndex: 'title',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Organization Name',
      dataIndex: 'organization',
      key: 'orgName',
      render: (orgName: any) => orgName.name,
    },
    {
      title: 'Start Date',
      dataIndex: 'startTime',
      key: 'startDate',
      render: (startTime: any) => moment(startTime).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: any) => {
        let color = 'green';
        if (status === 'upcoming') {
          color = 'volcano';
        } else if (status === 'ongoing') {
          color = 'geekblue';
        } else if (status === 'complete') {
          color = 'green';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
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

        <Col xs={24} sm={12} lg={16}>
          <Calendar fullscreen={false} dateCellRender={dateCellRender} />
        </Col>

        <Col lg={16}>
          <Table columns={columns} dataSource={exams} />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Flex justify="space-between" align="center">
              <Typography.Title level={5}>Your Badges</Typography.Title>
              <Typography.Title level={4}>3</Typography.Title>
            </Flex>
            <Flex justify="space-between" align="center">
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
