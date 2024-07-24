import { useState } from 'react';
import { Row } from 'antd';
import { EssayQuestionView, McqQuestionView, TimeContainer, PageHeader} from '../../components';
import { McqQuestion, EssayQuestion, Question } from '../../types/questiontypes';
import { HomeOutlined, ContainerOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import './ExamView.css';

const mcqQuestions: McqQuestion[] = [
  {
      question: '1. Which of the following algorithms is typically used for classification tasks in machine learning?',
      options: [
          'K-Means Clustering',
          'Linear Regression',
          'Support Vector Machine (SVM)',
          'Principal Component Analysis (PCA)',
      ],
  },
  {
    question: '2. Which of the following algorithms is typically used for classification tasks in machine learning?',
    options: [
        'Support Vector Machine (SVM)',
        'Principal Component Analysis (PCA)',
        'K-Means Clustering',
        'Linear Regression',
    ],
  },
  
];

const essayQuestions: EssayQuestion[] = [
  {
      question: '1. Describe the process of overfitting in machine learning and how it can be prevented.',
      length: 500,
  },
  {
    question: '2. Explain the concept of gradient descent and how it is used in training machine learning models.',
    length: 300,
  },
  
];

// Type guards (used to clearly distinguish between the two types of questions and avoid runtime errors)
const isMcqQuestion = (question: Question): question is McqQuestion => {
  return (question as McqQuestion).options !== undefined;
};

const isEssayQuestion = (question: Question): question is EssayQuestion => {
  return (question as EssayQuestion).length !== undefined;
};



export const ExamViewPage = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [examType] = useState<'mcq' | 'essay'>('mcq');

    const questions: Question[] = examType === 'mcq' ? mcqQuestions : essayQuestions;

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    
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
              }
            ]}
          />

          <Row gutter={[16, 16]}>
              <TimeContainer/>
              {isMcqQuestion(currentQuestion) ? (
                  <McqQuestionView
                      question={currentQuestion.question}
                      options={currentQuestion.options}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                  />
              ) : isEssayQuestion(currentQuestion) ? (
                  <EssayQuestionView
                      question={currentQuestion.question}
                      length={currentQuestion.length}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                  />
              ) : null}
          </Row>

        </div>
    );

};