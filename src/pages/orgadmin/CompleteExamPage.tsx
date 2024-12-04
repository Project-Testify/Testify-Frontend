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
import { getExamCandidateGradeData } from '../../api/services/organization';

interface ExamStats {
  totalCandidates: number;
  totalPassed: number;
  totalFailed: number;
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
      const examCandidateData = await getExamCandidateGradeData();
      const examsCandidateGrades = examCandidateData.data;

      const examsMap: { [key: string]: ExamStats & { name: string } } = {};

      examsCandidateGrades.forEach((examGradeData: any) => {
        const { examID, examTitle, status, score } = examGradeData;

        if (!examsMap[examID]) {
          examsMap[examID] = {
            name: examTitle,
            totalCandidates: 0,
            totalPassed: 0,
            totalFailed: 0,
            highestScore: 0,
            lowestScore: 100,
          };
        }

        const examStats = examsMap[examID];
        examStats.totalCandidates += 1;
        if (status === 'PASS') {
          examStats.totalPassed += 1;
        } else {
          examStats.totalFailed += 1;
        }
        examStats.highestScore = Math.max(examStats.highestScore, score);
        examStats.lowestScore = Math.min(examStats.lowestScore, score);
      });

      const exams = Object.keys(examsMap).map((examID) => ({
        id: examID,
        name: examsMap[examID].name,
        examStats: [examsMap[examID]],
      }));

      setExams(exams);
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
