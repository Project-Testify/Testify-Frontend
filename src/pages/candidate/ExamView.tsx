import { useState, useEffect } from 'react';
import { Row, Spin } from 'antd';
import {
  EssayQuestionView,
  McqQuestionView,
  TimeContainer,
  PageHeader,
} from '../../components';
import { McqQuestion, EssayQuestion, Question } from '../../types/questiontypes';
import { HomeOutlined, ContainerOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import './ExamView.css';

const isMcqQuestion = (question: Question): question is McqQuestion => {
  return (question as McqQuestion).options !== undefined;
};

const isEssayQuestion = (question: Question): question is EssayQuestion => {
  return (question as EssayQuestion).length !== undefined;
};

export const ExamViewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredIndexes, setAnsweredIndexes] = useState<number[]>([]);
  const [skippedIndexes, setSkippedIndexes] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [examType, setExamType] = useState<'mcq' | 'essay' | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (!answeredIndexes.includes(currentQuestionIndex + 1)) {
      setSkippedIndexes([...skippedIndexes, currentQuestionIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    if (!answeredIndexes.includes(currentQuestionIndex - 1)) {
      setSkippedIndexes([...skippedIndexes, currentQuestionIndex + 1]);
    }
  };

  const handleAnswered = (answer: string) => {
    setAnsweredIndexes([...answeredIndexes, currentQuestionIndex + 1]);
    setSkippedIndexes(skippedIndexes.filter((index) => index !== currentQuestionIndex + 1));
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleClearSelection = () => {
    setAnsweredIndexes(answeredIndexes.filter((index) => index !== currentQuestionIndex + 1));
    setSkippedIndexes([...skippedIndexes, currentQuestionIndex + 1]);
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestionIndex];
    setAnswers(newAnswers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex] || '';

  /* <CandidateCameraFeed cameraStream={cameraStream} alertMessage={alertMessage} /> 
   const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
   const [alertMessage, setAlertMessage] = useState<string | null>(null);*/

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/exam/1/questions`);
        const data = await response.json();
        if (data.questions) {
          setQuestions(data.questions);
          setExamType(data.questions[0]?.questionType?.toLowerCase() || 'mcq');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  const mcqOptions = isMcqQuestion(currentQuestion)
    ? currentQuestion.options.map((option) => option.optionText)
    : [];

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isUnanswered = !answeredIndexes.includes(currentQuestionIndex+1);

  return (
    <div style={{ padding: '20px' }}>
      <Helmet>
        <title>Testify | Machine Learning - Quiz 3</title>
      </Helmet>
      <PageHeader
        title="Machine Learning - Quiz 3"
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
                <ContainerOutlined />
                <span>Machine Learning - Quiz 3</span>
              </>
            ),
            path: '/',
          },
        ]}
      />

      <Row gutter={[16, 16]}>
        <TimeContainer
          totalQuestions={questions.length}
          answeredIndexes={answeredIndexes}
          skippedIndexes={skippedIndexes}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
        {isMcqQuestion(currentQuestion) ? (
          <McqQuestionView
            question={currentQuestion.questionText}
            questionNumber={currentQuestionIndex + 1}
            options={mcqOptions}
            selectedAnswer={answers[currentQuestionIndex]}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAnswer={handleAnswered}
            onClearSelection={handleClearSelection}
            disableNext={isLastQuestion}
            disablePrevious={isFirstQuestion}
            disableClear={isUnanswered}
          />
        ) : isEssayQuestion(currentQuestion) ? (
          <EssayQuestionView
            question={currentQuestion.questionText}
            length={currentQuestion.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAnswer={(answer) => handleAnswered(answer)}
            onClearSelection={handleClearSelection}
            selectedAnswer={selectedAnswer}
            disableNext={isLastQuestion}
            disablePrevious={isFirstQuestion}
            disableClear={isUnanswered}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default ExamViewPage;
