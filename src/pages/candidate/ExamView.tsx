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

  const token = sessionStorage.getItem('accessToken');
  const sessionId = sessionStorage.getItem('sessionId');

  const handleAnswered = (answer: string, questionId: number) => {
    // Find the question by questionId
    const question = questions.find((question) => question.questionId === questionId);
  
    if (question) {
      if (question.questionType === "MCQ") {
        // Handle MCQ question type
        const selectedOption = question.options?.find((option) => option.optionText === answer);
  
        if (selectedOption) {
          // Save the optionId along with the questionId
          setAnsweredIndexes([...answeredIndexes, currentQuestionIndex + 1]);
          setSkippedIndexes(skippedIndexes.filter((index) => index !== currentQuestionIndex + 1));
          setAnswers({ ...answers, [questionId]: selectedOption.optionId });
          
          
          const payload = {
            sessionId: sessionId, 
            questionId,
            optionId: selectedOption.optionId, 
            answerText: "" 
          };
  
          axios.post('http://localhost:8080/api/v1/exam/save-answer', payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            console.log("Answer saved successfully!");
          })
          .catch((error) => {
            console.error("Error saving answer:", error);
          });
        }
      } else if (question.questionType === "Essay") {
        // Handle Essay question type (just save the answer text)
        setAnsweredIndexes([...answeredIndexes, currentQuestionIndex + 1]);
        setSkippedIndexes(skippedIndexes.filter((index) => index !== currentQuestionIndex + 1));
        setAnswers({ ...answers, [questionId]: answer });

        const payload = {
          sessionId: sessionId,
          questionId,
          optionId: null, 
          answerText: answer 
        };
  
        axios.post('http://localhost:8080/api/v1/exam/save-answer', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("Answer saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving answer:", error);
        });
      }
    }
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

    // Request fullscreen on load
    const requestFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    };

    // Handle fullscreen change
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        console.log('Exited fullscreen');
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    requestFullscreen();

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, [id, token]);

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
            onAnswer={(answer: string) => handleAnswered(answer, currentQuestion.questionId)}
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
            onAnswer={(answer: string) => handleAnswered(answer, currentQuestion.questionId)} 
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
