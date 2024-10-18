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
import { SetStateAction, useState } from 'react';

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

const { Step } = Steps;

export const NewExamPage = () => {

  const { getOrganization } = useAuth(); // Use the hook here
  const [current, setCurrent] = useState(0);
  const examId = sessionStorage.getItem('examId');
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Track if it's update mode
  const [loading, setLoading] = useState(false); // For loading state
  const [isExamInfoSaved, setIsExamInfoSaved] = useState(false); // Track if exam info is saved
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
        organizationId: getOrganization() ?? 0,
        createdById: loggedInUser?.id ?? 0,
        isPrivate: false,
        orderType: ''
      };

      console.log('Exam Request:', examRequest);

      const response = await saveExamInformation(examRequest);

      if (response.data.success) { // Adjust this based on your actual API response structure
        const examId = response.data.id;
        sessionStorage.setItem('examId', examId);
        setIsExamInfoSaved(true); // Mark that exam info is saved
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
    // Block navigation if exam information is not saved and the user tries to go beyond step 0
    // if (newStep > 0 && !isExamInfoSaved) {
    //   message.warning('Please save exam information before proceeding to the next step.');
    //   return;
    // }
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
        {current === 2 && <AddGrading />}
        {current === 3 && <AddProctors />}
        {current === 4 && <AddCandidate />}
        {current === 5 && <AdditionalFeatures />}

        <Divider />
      </Card>
    </div>
  );
};
