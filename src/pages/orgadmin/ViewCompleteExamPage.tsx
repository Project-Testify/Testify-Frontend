import { ExamsTable, PageHeader } from '../../components';

import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  BadgeProps,
  Button,
  Card,
  Col,
  Flex,
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
import { useLocation, useNavigate } from 'react-router-dom';
import { getExamCandidateGradeData } from '../../api/services/organization';

interface ExamStats {
  totalCandidates: number;
  totalPassed: number;
  totalFailed: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}

export const ViewCompleteExamPage = () => {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error('You must be logged in to perform this action.');
    return;
  }
  const organizationId = loggedInUser.id;
  const navigate = useNavigate();

  // get state from use navigate
  const location = useLocation();
  const examid = location.state.examId as any;
  console.log('state', examid);


  const currentDate = new Date();

  const fetchExamData = async () => {
    try {
      const examCandidateData = await getExamCandidateGradeData();
      const examsCandidateGrades = examCandidateData.data;

      const filteredExams = examsCandidateGrades
        .filter((exam: any) => exam.examID === examid)
        .map((exam: any) => ({
          candidateId: exam.candidateID,
          examId: exam.examID,
          name: exam.candidateName,
          grade: exam.grade,
          score: exam.score,
          status: exam.status === 'PASS' ? 'Passed' : 'Failed',
        }));

      setExams(filteredExams);
    } catch (error) {
      message.error('Error fetching exams');
      console.log(error);
    }
  };


  

  //Columns for the table
  const COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, { name, candidateId}: ExamResponse) => {

        const getAvatarColor = (id: number) => {
          const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#52c41a', '#eb2f96', '#fa541c'];
          return colors[id % colors.length];
        };
  

        return(
          <Flex gap={10} align={'center'}>

          <Avatar
            size="large"
            gap={1}
            style={{
              verticalAlign: 'middle',
              backgroundColor: getAvatarColor(candidateId),
              color: '#fff',
            }}
          >
            {name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()}
          </Avatar>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            className="text-capitalize"
            style={{ marginBottom: 0 }}
          >
            {name}
          </Typography.Paragraph>
        </Flex>
        )
      }
      
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let badgeStatus: BadgeProps['status'];

        if (status === 'Passed') {
          badgeStatus = '#52c41a';
        } else {
          badgeStatus = 'danger';
        }

        return (
          <Badge
            // status={badgeStatus}
            color={badgeStatus}
            count={status}
          />
        );
      },
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade: string) => {
        let badgeStatus: BadgeProps['status'];

        if (grade === 'A') {
          badgeStatus = 'success';
        } else if (grade === 'B') {
          badgeStatus = 'warning';
        } else {
          badgeStatus = 'error';
        }

        return (
          <Badge
            status={badgeStatus}
            text={grade}
            className="text-capitalize"
          />
        );
      },
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Progress
          type="circle"
          percent={score}
          width={40}
          format={(percent) => `${percent}`}
        />
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (examId: number) => (
        <Button type="primary" onClick={() => handleClick(examId)}>
          View
        </Button>
      ),
    },
  ];
  useEffect(() => {
    fetchExamData();
  }, [organizationId]);

  const [examsData, setExams] = useState<any[]>([]);

  function handleClick(examId: number) {
    throw new Error('Function not implemented.');
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
            pagination={true}
            data={examsData}

          />
        </Card>
      </Col>
    </div>
  );
};
