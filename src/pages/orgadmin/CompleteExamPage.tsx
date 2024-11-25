import { ExamsTable, PageHeader } from '../../components';

import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Col,
  message,
  Progress,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExamResponse } from '../../api/types';
import { getLoggedInUser } from '../../utils/authUtils';
import { format } from 'date-fns';
import { useHistory, useNavigate } from 'react-router-dom';

interface ExamStats {
  totalCandidates: number;
  totalPassed: number;
  totalFailed: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}

export const CompleteExamPage = () => {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error('You must be logged in to perform this action.');
    return;
  }
  const organizationId = loggedInUser.id;

  const navigate = useNavigate();
  
  const currentDate = new Date();

  const fetchExams = async () => {
    try {
      // const response  = await getExams(organizationId);
      const response = {
        data: [
            {
              id: 1,
              name: 'Graphics Exam',
              startDatetime: '2021-09-23T10:00:00Z',
              endDatetime: '2021-09-23T12:00:00Z',
              duration: 120,
              totalMarks: 100,
              passingMarks: 50,
              organizationId: 1,
              organization: {
                id: 1,
                name: 'UCSC',
                address: 'Address 1',
                phone: '1234567890',
                email: 'ucsc@gm.com',
                website: 'www.ucsc.cmb.ac.lk',
              },
              examSetters: [
                {
                  id: 1,
                  name: 'Tom Doe',
                  email: 'tom@gm.com',
                  phone: '1234567890',
                  organizationId: 1,
                },
              ],
              examStats: [
                {
                  totalCandidates: 10,
                  totalPassed: 4,
                  totalFailed: 6,
                  averageScore: 60,
                  highestScore: 80,
                  lowestScore: 40,
                },
              ],
            },
            {
              id: 2,
              name: 'Algorithms Exam',
              startDatetime: '2021-10-05T14:00:00Z',
              endDatetime: '2021-10-05T16:00:00Z',
              duration: 120,
              totalMarks: 150,
              passingMarks: 75,
              organizationId: 2,
              organization: {
                id: 2,
                name: 'MIT',
                address: '77 Massachusetts Ave, Cambridge, MA',
                phone: '6172531000',
                email: 'info@mit.edu',
                website: 'www.mit.edu',
              },
              examSetters: [
                {
                  id: 2,
                  name: 'Alice Smith',
                  email: 'alice@mit.edu',
                  phone: '6171234567',
                  organizationId: 2,
                },
              ],
              examStats: [
                {
                  totalCandidates: 15,
                  totalPassed: 10,
                  totalFailed: 5,
                  averageScore: 85,
                  highestScore: 100,
                  lowestScore: 70,
                },
              ],
            },
            {
              id: 3,
              name: 'Database Management Exam',
              startDatetime: '2021-11-10T09:00:00Z',
              endDatetime: '2021-11-10T11:00:00Z',
              duration: 120,
              totalMarks: 120,
              passingMarks: 60,
              organizationId: 3,
              organization: {
                id: 3,
                name: 'Stanford University',
                address: '450 Serra Mall, Stanford, CA',
                phone: '6507232300',
                email: 'contact@stanford.edu',
                website: 'www.stanford.edu',
              },
              examSetters: [
                {
                  id: 3,
                  name: 'John Lee',
                  email: 'john@stanford.edu',
                  phone: '6501234567',
                  organizationId: 3,
                },
              ],
              examStats: [
                {
                  totalCandidates: 20,
                  totalPassed: 12,
                  totalFailed: 8,
                  averageScore: 75,
                  highestScore: 95,
                  lowestScore: 50,
                },
              ],
            },
            {
              id: 4,
              name: 'Software Engineering Exam',
              startDatetime: '2021-12-15T13:00:00Z',
              endDatetime: '2021-12-15T15:00:00Z',
              duration: 120,
              totalMarks: 200,
              passingMarks: 100,
              organizationId: 4,
              organization: {
                id: 4,
                name: 'Carnegie Mellon University',
                address: '5000 Forbes Ave, Pittsburgh, PA',
                phone: '4122682000',
                email: 'admissions@cmu.edu',
                website: 'www.cmu.edu',
              },
              examSetters: [
                {
                  id: 4,
                  name: 'Emily Davis',
                  email: 'emily@cmu.edu',
                  phone: '4129876543',
                  organizationId: 4,
                },
              ],
              examStats: [
                {
                  totalCandidates: 25,
                  totalPassed: 18,
                  totalFailed: 7,
                  averageScore: 90,
                  highestScore: 110,
                  lowestScore: 60,
                },
              ],
            },         
        ],
      };

      const exams = response.data;
      console.log(response.data);
      setExams(exams);
      console.log('exams', exams);
    } catch (error) {
      message.error('Error fetching exams');
      console.log(error);
    }
  };

  //Columns for the table
  const COLUMNS = [
    {
      // exam id
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_: any, { id }: ExamResponse) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {id}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, { name }: ExamResponse) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {name}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'examStats',
      key: 'examStats',
      render: (examStats: ExamStats) => {
        if (!examStats) return null; // Handle cases where examStats might be undefined or null

        const totalCandidates = examStats[0].totalCandidates || 1; // Avoid division by zero
        const percentage =
          ((examStats[0].totalPassed + examStats[0].totalFailed) /
            totalCandidates) *
          100;
        console.log('percee', examStats.totalCandidates);
        console.log('percentage', percentage);
        return (
          <>
            
              <Badge
                status="processing"
                text={`${examStats[0].totalPassed} passed, ${examStats[0].totalFailed} failed, ${examStats[0].totalCandidates} total`}
                className="text-capitalize"
              />
            <Progress
              percent={Math.round(percentage)} // Round percentage for display
              status="active"
              success={{
                percent: (examStats[0].totalPassed / totalCandidates) * 100,
              }}
            />
          </>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (examId: number) => (
        <Button type="primary" onClick={() => handleClick(examId)}>
          View Exam
        </Button>
      ),
    },
  ];
  useEffect(() => {
    fetchExams();
  }, [organizationId]);

  const [examsData, setExams] = useState<any[]>([]);

 

  function handleClick(examId: number) {
    // navigate to view complete exm page

    navigate('/org-admin/view_complete_exam', { state: { examId } });


  }

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Completed exams'}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Exams</span>
              </>
            ),
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Completed Exams</span>
              </>
            ),
          },
        ]}
      />
      <Col span={24}>
        <Card>
          <Table
            columns={COLUMNS}
            dataSource={examsData}
            rowKey={(record) => record.id}
            pagination={false}
            data={examsData}
          />
        </Card>
      </Col>
    </div>
  );
};
