import { useState, useEffect } from 'react';
import { Row, Spin } from 'antd';
import axios from 'axios';
import {
  EssayQuestionView,
  McqQuestionView,
  TimeContainer,
  PageHeader,
} from '../../components';
import { McqQuestion, EssayQuestion, Question } from '../../types/questiontypes';
import { HomeOutlined, ContainerOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import './ExamView.css';

const isMcqQuestion = (question: Question): question is McqQuestion => {
  return (question as McqQuestion).questionType === "MCQ";
};

const isEssayQuestion = (question: Question): question is EssayQuestion => {
  return (question as EssayQuestion).questionType === "Essay";
};

export const ExamViewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredIndexes, setAnsweredIndexes] = useState<number[]>([]);
  const [skippedIndexes, setSkippedIndexes] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [examType, setExamType] = useState<'mcq' | 'essay' | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id, name } = location.state || {};

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

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8080/api/v1/exam/${id}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        const data = response.data;
        if (data.questions) {
          setQuestions(data.questions);
          setExamType(data.examType?.toLowerCase() as 'mcq' | 'essay');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isUnanswered = !answeredIndexes.includes(currentQuestionIndex + 1);

  return (
    <div style={{ padding: '20px' }}>
      <Helmet>
        <title>Testify | Exam</title>
      </Helmet>
      <PageHeader
        title={name}
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
                <span>{name}</span>
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
            options={currentQuestion.options.map((option) => option.optionText)}
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
            length={500}
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
