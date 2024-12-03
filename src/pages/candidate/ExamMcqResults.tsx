import { useEffect, useState } from 'react';
import { Progress, Typography, Row, Col, Card, Button } from 'antd';
import {
  HomeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { PageHeader } from '../../components';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import './ExamResultsPage.css';

const { Title, Text } = Typography;

export const ExamMcqResults = () => {
  const navigate = useNavigate();
  interface Question {
    questionId: number;
    questionText: string;
    options: { optionId: number; optionText: string; correct: boolean; marks: number }[];
  }

  interface Option {
    optionId: number;
    optionText: string;
    correct: boolean;
    marks: number;
  }
  
  interface Question {
    questionId: number;
    questionText: string;
    options: Option[];
  }
  
  interface UserAnswer {
    questionId: number;
    optionId: number;
  }

  const [examResults, setExamResults] = useState<UserAnswer[]>([]);
  const [examDetails, setExamDetails] = useState<Question[]>([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem('accessToken');
  const sessionId = sessionStorage.getItem('sessionId');
  const examId = sessionStorage.getItem('examId');

  const handleDashboard = () => {
    navigate('/candidate/');
  };

  useEffect(() => {
    const fetchExamResults = async () => {
      setLoading(true);
      try {
        if (!examId) {
          console.error("Error: examId is null or undefined.");
          return; // Exit early if examId is invalid
        }
  
        // Fetch Candidate Answers (MCQ Details)
        const mcqResponse = await fetch(
          `http://localhost:8080/api/v1/grade/${sessionId}/mcq-details`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mcqData: UserAnswer[] = await mcqResponse.json();
  
        // Fetch Exam Questions and Correct Answers
        const examResponse = await fetch(
          `http://localhost:8080/api/v1/exam/${examId}/questions/${sessionId}/answers`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const examData: { questions: Question[] } = await examResponse.json();
  
        if (!Array.isArray(mcqData) || !Array.isArray(examData.questions)) {
          console.error("Invalid data structure");
          return;
        }
  
        // Set Data
        setExamResults(mcqData);
        setExamDetails(examData.questions);
  
        // Calculate Statistics
        let correctAnswersCount = 0;
        let incorrectAnswersCount = 0;
        let correctAnswersMarks = 0; 
        let skippedQuestions = 0; 
        let totalMarks = 0; 

        examData.questions.forEach((question) => {
          // Calculate total marks for all correct options
          totalMarks += question.options
            .filter((opt) => opt.correct)
            .reduce((sum, opt) => sum + opt.marks, 0);

          // Find user's answer for the current question
          const userAnswer = mcqData.find(
            (answer) => Number(answer.questionId) === question.questionId
          );

          if (userAnswer) {
            // Find the selected option and the correct option
            const selectedOption = question.options.find(
              (opt) => opt.optionId === Number(userAnswer.optionId)
            );
            const correctOption = question.options.find((opt) => opt.correct);

            if (selectedOption && correctOption) {
              if (selectedOption.optionId == correctOption.optionId) {
                correctAnswersCount += 1;
                console.log(selectedOption.optionId);
                correctAnswersMarks += selectedOption.marks || 0;
              } else {
                incorrectAnswersCount += 1;
                console.log(selectedOption.optionId);
              }
            }
          } else {
            skippedQuestions += 1;
          }
        });
  
        setTotalMarks(totalMarks);
        setCorrectAnswers(correctAnswersCount);
        setIncorrectAnswers(incorrectAnswersCount);
        setSkippedQuestions(skippedQuestions);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExamResults();
  }, [token, sessionId, examId]);
  
  

  const percentage = totalMarks > 0 ? Math.round((correctAnswers*10 / totalMarks) * 100) : 0;
  const examName = 'Machine Learning - Quiz 2'; // Replace with actual exam name if needed

  return (
    <div style={{ padding: '20px' }}>
      <Helmet>
        <title>Testify - Exam Results</title>
      </Helmet>
      <PageHeader
        title="Exam Results"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
            path: '/candidate',
          },
          {
            title: (
              <>
                <ContainerOutlined />
                <span>{examName}</span>
              </>
            ),
            path: '/candidate/exam',
          },
          {
            title: (
              <>
                <CheckCircleOutlined />
                <span>Exam Results</span>
              </>
            ),
            path: '/candidate/exam/results',
          },
        ]}
      />
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18}>
          <Card className="results-summary-card">
            <Row justify="center">
              <Col span={24}>
                <Title level={2} className="exam-results-title">
                  {examName} - Results
                </Title>
              </Col>
            </Row>
            <Row gutter={[16, 16]} align="middle" justify="space-around">
              <Col xs={24} sm={12} md={8} className="progress-container">
                <Progress
                  type="circle"
                  percent={percentage}
                  strokeColor="#6D76ED"
                  strokeWidth={14}
                  width={180}
                  format={(percent) => (
                    <span
                      style={{
                        color: '#6D76ED',
                        fontSize: '24px',
                        fontWeight: 'bold',
                      }}
                    >
                      {percent}%
                    </span>
                  )}
                />
                <Text className="progress-label">
                  Scored {correctAnswers*10} out of {totalMarks}
                </Text>
              </Col>

              <Col xs={24} sm={12} md={14}>
                <div className="stats-container">
                  <Title level={3} className="stats-title">Exam Statistics</Title>
                  <div className="stats-item">
                    <Text className="stats-label">Correct Answers:</Text>
                    <Text className="stats-value correct-text">{correctAnswers}</Text>
                  </div>
                  <div className="stats-item">
                    <Text className="stats-label">Incorrect Answers:</Text>
                    <Text className="stats-value incorrect-text">{incorrectAnswers}</Text>
                  </div>
                  <div className="stats-item">
                    <Text className="stats-label">Skipped Questions:</Text>
                    <Text className="stats-value skipped-text">{skippedQuestions}</Text>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    className="dashboard-btn"
                    onClick={handleDashboard}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>

          {!loading &&
            examDetails.map((question: Question, index: number) => {
              const userAnswer = examResults.find(
                (answer: UserAnswer) =>  Number(answer.questionId) === question.questionId
              );
              const userSelectedOptionId = userAnswer ? userAnswer.optionId : null;

              return (
                <Card
                  key={index}
                  className="question-card"
                  style={{
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <div className="question-header">
                    <Title level={4} className="question-title">
                      {question.questionText}
                    </Title>
                    <Text className="marks-display">
                      Marks:{" "}
                      {userSelectedOptionId
                        ? question.options.find((opt: Option) => opt.optionId === userSelectedOptionId)?.correct
                          ? "10" 
                          : "0" 
                        : "0"}
                      {" "}
                      /{" "}
                      {question.options.reduce(
                        (acc: number, opt: Option) => acc + (opt.correct ? 10 : 0),
                        0
                      )}
                    </Text>
                  </div>
                  <ul className="option-list">
                    {question.options.map((option: Option, optIndex: number) => {
                      const isCorrect = option.correct;
                      const isSelected = option.optionId == userSelectedOptionId;

                      // Add CSS classes based on whether the option is correct, selected, or incorrect
                      let optionClass = '';
                      if (isCorrect) {
                        optionClass = 'correct'; // Correct answer
                      } else if (isSelected) {
                        optionClass = 'incorrect'; // User's incorrect answer
                      }

                      return (
                        <li
                          key={optIndex}
                          className={`option-item ${optionClass}`}
                        >
                          <span>{option.optionText}</span>
                          {isCorrect && (
                            <CheckCircleOutlined className="option-icon correct-icon" />
                          )}
                          {isSelected && !isCorrect && (
                            <CloseCircleOutlined className="option-icon incorrect-icon" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              );
            })}



          <Button
            type="primary"
            size="large"
            style={{ marginTop: '16px', display: 'block', marginInline: 'auto' }}
            onClick={handleDashboard}
          >
            Go to Dashboard
          </Button>
        </Col>
      </Row>
    </div>
  );
};
