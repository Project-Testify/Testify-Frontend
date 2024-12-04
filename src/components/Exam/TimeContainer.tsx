import { Col, Divider, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QuestionIndexes } from './QuestionIndexes';
import { CountdownTimer } from './CountdownTimer';
import axios from 'axios';
import './styles.css';

interface TimeContainerProps {
  totalQuestions: number;
  answeredIndexes: number[];
  skippedIndexes: number[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

export const TimeContainer = ({
  totalQuestions,
  answeredIndexes,
  skippedIndexes,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: TimeContainerProps) => {
  const navigate = useNavigate();

  const handleSubmitExam = async () => {
    const token = sessionStorage.getItem('accessToken');
    const sessionId = sessionStorage.getItem('sessionId');
    const examType = sessionStorage.getItem('examType');
    if (!token || !sessionId) {
      message.error('Failed to submit exam. Please try again.');
      return;
    }
    

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/exam/${sessionId}/submit`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        message.success('Exam submitted successfully.');

        // Navigate based on exam type from state
        if (examType === 'MCQ') {
          navigate('/candidate/exam/mcq-results');
        } else {
          navigate('/candidate/exam/feedback');
        }
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      message.error('Could not submit the exam. Please try again.');
    }
  };

  return (
    <Col span={6} push={18} className="time-container">
      <Col span={24}>
        <div className="time-content">
          <div className="countdown-timer">
            <span className="topic">Time Remaining</span>
            <CountdownTimer initialHours={0} initialMinutes={60} initialSeconds={0} />
          </div>
          <Divider />
          <QuestionIndexes
            totalQuestions={totalQuestions}
            answeredIndexes={answeredIndexes}
            skippedIndexes={skippedIndexes}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={setCurrentQuestionIndex}
          />
          <Divider />
          <div className="submit-button-container">
            <Button
              type="primary"
              size={'large'}
              className="submit-button"
              onClick={handleSubmitExam}
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </Col>
    </Col>
  );
};
