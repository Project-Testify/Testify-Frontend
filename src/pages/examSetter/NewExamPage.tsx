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
} from 'antd';
import { useState } from 'react';

import { saveExamInformation } from '../../api/services/ExamServices';
import { ExamRequestForm, ExamRequest } from '../../api/types';
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

  // const { getOrganization } = useAuth(); // Use the hook here
  const organizationId = sessionStorage.getItem('orgId');
  const [current, setCurrent] = useState(0);
  const loggedInUser = getLoggedInUser();

  const onFinishExamInformation = async (values: ExamRequestForm) => {
    try {
      // Create examRequest object
      const examRequest: ExamRequest = {
        title: values.title,
        description: values.description,
        duration: values.duration,
        startDatetime: values.date[0].format('YYYY-MM-DDTHH:mm:ss'), // Updated format
        endDatetime: values.date[1].format('YYYY-MM-DDTHH:mm:ss'), // Updated format
        instructions: values.instructions,
        organizationId: Number(organizationId),
        createdById: loggedInUser?.id ?? 0,
        isPrivate: false,
        orderType: 'FIXED'
      };

      console.log('Exam Request:', examRequest);

      const response = await saveExamInformation(examRequest);

      if (response.data.success) { // Adjust this based on your actual API response structure
        const examId = response.data.id;
        sessionStorage.setItem('examId', examId);
        setCurrent(1); // Move to the next step
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
        <Steps
          onChange={onStepChange} // Handle step change with validation
          current={current}
          labelPlacement="vertical"
          type="default"
        >
          <Step title="Exam Information"></Step>
          <Step title="Make Questions"></Step>
          <Step title="Question Sequence"></Step>
          <Step title="Grading"></Step>
          <Step title="Proctors"></Step>
          <Step title="Select Candidates"></Step>
          <Step title="Additional Features"></Step>
        </Steps>

        <Divider />

        {current === 0 && (
          <ExamInformation onFinishFun={onFinishExamInformation} />
        )}
        {current === 1 && <MakeQuestions />}
        {current === 2 && <SequenceHandling />}
        {current === 3 && <AddGrading />}
        {current === 4 && <AddProctors />}
        {current === 5 && <AddCandidate />}
        {current === 6 && <AdditionalFeatures />}

        <Divider />
      </Card>
    </div>
  );
};
