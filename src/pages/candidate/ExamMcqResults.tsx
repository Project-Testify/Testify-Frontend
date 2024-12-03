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
  const [gradingScheme, setGradingScheme] = useState<any[]>([]);
  const [candidateGrade, setCandidateGrade] = useState<string>('');
  const [status, setStatus] = useState<string>('PASS');

  const token = sessionStorage.getItem('accessToken');
  const sessionId = sessionStorage.getItem('sessionId');
  const examId = sessionStorage.getItem('examId');
  const userString = sessionStorage.getItem('user');
  const name = sessionStorage.getItem('examName');
  if (!userString || !token) {
    console.error("User information or token not found in session storage.");
    return;
  }

  const user = JSON.parse(userString); // Parse the user object
  const candidateId = user?.id; // Extract the candidateId

  if (!candidateId) {
    console.error("Candidate ID not found in user object.");
    return;
  }

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
  
        // Fetch Grading Scheme (Only Once)
        const gradingResponse = await fetch(
          `http://localhost:8080/api/v1/grade/1/grading-scheme`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const gradingData = await gradingResponse.json();
        setGradingScheme(gradingData);
  
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
        let totalMarks = 0;
        let correctAnswersMarks = 0;
        let skippedQuestions = 0;

        // Assuming each correct answer is worth 10 marks
        const marksPerAnswer = 10;

        examData.questions.forEach((question) => {
          // Calculate total marks for the exam
          totalMarks += question.options.filter((opt) => opt.correct).length * marksPerAnswer;

          const userAnswer = mcqData.find(
            (answer) => Number(answer.questionId) === question.questionId
          );

          if (userAnswer) {
            const selectedOption = question.options.find(
              (opt) => opt.optionId === Number(userAnswer.optionId)
            );
            const correctOption = question.options.find((opt) => opt.correct);

            if (selectedOption && correctOption) {
              if (selectedOption.optionId === correctOption.optionId) {
                correctAnswersCount += 1;
                correctAnswersMarks += marksPerAnswer;
              } else {
                incorrectAnswersCount += 1;
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

        // Determine Grade
        const scorePercentage = (correctAnswersMarks / totalMarks) * 100;
        let grade = 'F';

        gradingScheme.forEach((gradeScheme) => {
          if (scorePercentage >= gradeScheme.minMarks && scorePercentage <= gradeScheme.maxMarks) {
            grade = gradeScheme.grade;
          }
        });

        setCandidateGrade(grade);
        setStatus(grade === 'F' ? 'FAIL' : 'PASS');

  
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExamResults();
  }, [examId, sessionId, token]);

  const percentage = totalMarks > 0 ? Math.round((correctAnswers * 10 / totalMarks) * 100) : 0;
  const examName = name;

  const handleGradeSubmission = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/grade/setExamCandidateGrade',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            examID: examId,
            candidateID: candidateId,
            grade: candidateGrade,
            score: correctAnswers * 10,
            status: status,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log('Grade submitted successfully');
      } else {
        console.error('Error submitting grade');
      }
    } catch (error) {
      console.error('Error submitting grade:', error);
    }
  };

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
                  Scored {correctAnswers * 10} out of {totalMarks}
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
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} justify="center" align="middle">
              
              <Col xs={24} sm={8} md={6}>
              <br />
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleDashboard}
                  icon={<HomeOutlined />}
                >
                  Go to Dashboard
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
              <br />
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleGradeSubmission}
                  icon={<CheckCircleOutlined />}
                >
                  Submit Grade
                </Button>
              </Col>
            </Row>
          </Card>
          {!loading && examDetails.map((question, index) => {
              const userAnswer = examResults.find(
                (answer) => Number(answer.questionId) === question.questionId
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
                        ? question.options.find((opt) => opt.optionId === userSelectedOptionId)?.correct
                          ? "10" 
                          : "0" 
                        : "0"}
                      {" "}
                      /{" "}
                      {question.options.reduce(
                        (acc, opt) => acc + (opt.correct ? 10 : 0),
                        0
                      )}
                    </Text>
                  </div>
                  <ul className="option-list">
                    {question.options.map((option, optIndex) => {
                      const isCorrect = option.correct;
                      const isSelected = option.optionId === userSelectedOptionId;

                      let optionClass = '';
                      if (isCorrect) {
                        optionClass = 'correct';
                      } else if (isSelected) {
                        optionClass = 'incorrect';
                      }

                      return (
                        <li key={optIndex} className={`option-item ${optionClass}`}>
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
                  block
                  onClick={handleDashboard}
                  icon={<HomeOutlined />}
                >
                  Go to Dashboard
                </Button>
        </Col>
      </Row>
    </div>
  );
};
