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

const mockExamResults = [
  {
    question: '1. Which algorithm is used for classification tasks?',
    options: [
      'K-Means Clustering',
      'Linear Regression',
      'Support Vector Machine (SVM)',
      'Principal Component Analysis (PCA)',
    ],
    correctOptions: [2], // Index of correct answers
    userAnswer: [2], // User's selected answers
    marks: 10,
  },
  {
    question: '2. What is the primary goal of unsupervised learning?',
    options: [
      'Predict output for new data',
      'Find hidden patterns or groupings in data',
      'Train models with labeled data',
      'Optimize neural network architectures',
    ],
    correctOptions: [1],
    userAnswer: [0],
    marks: 0,
  },
  {
    question: '3. What does PCA stand for?',
    options: [
      'Principal Component Analysis',
      'Predictive Cluster Algorithm',
      'Partial Component Adjustment',
      'Probabilistic Component Assessment',
    ],
    correctOptions: [0],
    userAnswer: [0],
    marks: 10,
  },
];

export const ExamMcqResults = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/candidate/');
  };

  // Total marks
  const totalMarks = mockExamResults.reduce((sum, q) => sum + q.marks, 0);

  // Derive statistics
  const correctAnswers = mockExamResults.filter((q) =>
    q.correctOptions.every((opt) => q.userAnswer.includes(opt))
  ).length;
  const incorrectAnswers = mockExamResults.filter(
    (q) =>
      !q.correctOptions.every((opt) => q.userAnswer.includes(opt)) &&
      q.userAnswer.length > 0
  ).length;
  const skippedQuestions = mockExamResults.filter((q) => q.userAnswer.length === 0).length;
  const maxMarks = mockExamResults.length * 10;
  const percentage = Math.round((totalMarks / maxMarks) * 100);
  const examName = 'Machine Learning - Quiz 2';


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
                <span>Machine Learning - Quiz 3</span>
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
              <Text
                className="progress-label">
                Scored {totalMarks} out of {maxMarks}
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

          {mockExamResults.map((question, index) => (
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
                  {question.question}
                </Title>
                <Text className="marks-display">
                  Marks: {question.marks} / 10
                </Text>
              </div>
              <ul className="option-list">
                {question.options.map((option, optIndex) => {
                  const isCorrect = question.correctOptions.includes(optIndex);
                  const isSelected = question.userAnswer.includes(optIndex);

                  return (
                    <li
                      key={optIndex}
                      className={`option-item ${
                        isCorrect ? 'correct' : isSelected ? 'incorrect' : ''
                      }`}
                    >
                      <span>{option}</span>
                      {isCorrect && (
                        <CheckCircleOutlined
                          className="option-icon correct-icon"
                        />
                      )}
                      {isSelected && !isCorrect && (
                        <CloseCircleOutlined
                          className="option-icon incorrect-icon"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}

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
