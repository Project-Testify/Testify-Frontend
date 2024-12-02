import {
  PageHeader,
  Card
} from '../../components';

import {
  BankOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import {
  Steps,
  Divider,
  message,
  Row,
  Col,
} from 'antd';
import { useState } from 'react';

import { saveExamInformation } from '../../api/services/ExamServices';
import { ExamRequestForm, ExamRequest } from '../../api/types';
import { useAuth } from '../../hooks/useAuth';
import MakeQuestions from './MakeQuestions';
import ExamInformation from './ExamInformation';
import AddGrading from './AddGrading';
import AddProctors from './AddProctors';
import AddCandidate from './AddCandidate';
import AdditionalFeatures from './AdditionalFeatures';
import { getLoggedInUser } from '../../utils/authUtils';
import SequenceHandling from './SequenceHandling';

const { Step } = Steps;

export const NewExamPage = () => {

  const { getOrganization } = useAuth();
  const [current, setCurrent] = useState(0);
  const loggedInUser = getLoggedInUser();

  const onFinishExamInformation = async (values: ExamRequestForm) => {
    try {
      const examRequest: ExamRequest = {
        title: values.title,
        description: values.description,
        duration: values.duration,
        startDatetime: values.date[0].format('YYYY-MM-DDTHH:mm:ss'),
        endDatetime: values.date[1].format('YYYY-MM-DDTHH:mm:ss'),
        instructions: values.instructions,
        organizationId: getOrganization() ?? 0,
        createdById: loggedInUser?.id ?? 0,
        isPrivate: false,
        orderType: 'FIXED'
      };

      const response = await saveExamInformation(examRequest);

      if (response.data.success) {
        const examId = response.data.id;
        sessionStorage.setItem('examId', examId);
        setCurrent(1);
        message.success('Exam information saved successfully!');
      } else {
        message.error('Failed to save exam information');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while saving exam information');
    }
  };

  const onStepChange = (newStep: number) => {
    setCurrent(newStep);
  };

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'New exam'}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined/>
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
        ]}
      />

      <Card>
        <Row gutter={16}>
          {/* Left Column: Steps List */}
          <Col span={6}>
            <Steps
              direction="vertical"
              onChange={onStepChange}
              current={current}
            >
              <Step title="Exam Information" />
              <Step title="Make Questions" />
              <Step title="Question Sequence" />
              <Step title="Grading" />
              <Step title="Proctors" />
              <Step title="Select Candidates" />
              <Step title="Additional Features" />
            </Steps>
          </Col>

          {/* Right Column: Content */}
          <Col span={18}>
            {current === 0 && (
              <ExamInformation onFinishFun={onFinishExamInformation} />
            )}
            {current === 1 && <MakeQuestions />}
            {current === 2 && <SequenceHandling />}
            {current === 3 && <AddGrading />}
            {current === 4 && <AddProctors />}
            {current === 5 && <AddCandidate />}
            {current === 6 && <AdditionalFeatures />}
          </Col>
        </Row>
        <Divider />
      </Card>
    </div>
  );
};
