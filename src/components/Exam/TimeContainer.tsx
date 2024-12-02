import { Col, Divider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QuestionIndexes } from './QuestionIndexes';
import { CountdownTimer } from './CountdownTimer';
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

  const handleSubmitExam = () => {
    navigate('/candidate/exam/feedback');
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
