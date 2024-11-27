import { useState, useEffect } from 'react';
import { Row } from 'antd';
import { EssayQuestionView, McqQuestionView, TimeContainer, PageHeader , CandidateCameraFeed} from '../../components';
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
    {
      question: '3. What is the main goal of unsupervised learning?',
      options: [
        'To predict labels for new data points',
        'To cluster data into groups based on similarities',
        'To minimize the cost function',
        'To optimize the parameters of a model',
      ],
    },
    {
      question: '4. Which of the following is a common activation function used in neural networks?',
      options: [
        'ReLU (Rectified Linear Unit)',
        'Euclidean Distance',
        'Softmax Regression',
        'Gradient Descent',
      ],
    },
    {
      question: '5. What does overfitting in machine learning mean?',
      options: [
        'The model performs well on unseen data but poorly on training data',
        'The model performs poorly on both training and test data',
        'The model performs exceptionally well on training data but poorly on unseen data',
        'The model fits perfectly to unseen data',
      ],
    },
    {
      question: '6. What is the purpose of the learning rate in gradient descent?',
      options: [
        'To determine the complexity of the model',
        'To specify the number of features used',
        'To control the step size during optimization',
        'To evaluate the accuracy of the model',
      ],
    },
    {
      question: '7. Which of the following techniques is used to reduce dimensionality?',
      options: [
        'Principal Component Analysis (PCA)',
        'Decision Trees',
        'Support Vector Machines (SVM)',
        'K-Nearest Neighbors (KNN)',
      ],
    },
    {
      question: '8. What is a hyperparameter in the context of machine learning?',
      options: [
        'A parameter that is learned from the training data',
        'A parameter set before training the model',
        'A parameter adjusted during backpropagation',
        'A parameter used for evaluating model accuracy',
      ],
    },
    {
      question: '9. Which of the following methods is commonly used for handling imbalanced datasets?',
      options: [
        'Oversampling the minority class',
        'Reducing the number of features',
        'Increasing the learning rate',
        'Adding noise to the data',
      ],
    },
    {
      question: '10. What is the role of a cost function in machine learning?',
      options: [
        'To split data into training and test sets',
        'To minimize errors during training',
        'To evaluate the performance of a model on unseen data',
        'To optimize the architecture of a neural network',
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
  {
    question: '3. Discuss the differences between supervised, unsupervised, and reinforcement learning, and provide examples for each type.',
    length: 400,
  },
  {
    question: '4. Describe the bias-variance tradeoff in machine learning and explain how it affects model performance.',
    length: 350,
  },
  {
    question: '5. Explain the concept of feature scaling and its importance in machine learning algorithms such as SVM and KNN.',
    length: 250,
  },
];

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
  const [examType] = useState<'mcq' | 'essay'>('mcq');

  const questions: Question[] = examType === 'essay' ? mcqQuestions : essayQuestions;

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
    if (!answeredIndexes.includes(currentQuestionIndex + 1)) {
      setSkippedIndexes([...skippedIndexes, currentQuestionIndex + 1]);
    }
  };

  const handleAnswered = (answer: string) => {
    setAnsweredIndexes([...answeredIndexes, currentQuestionIndex + 1]);
    setSkippedIndexes(skippedIndexes.filter(index => index !== currentQuestionIndex + 1));
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleClearSelection = () => {
    setAnsweredIndexes(answeredIndexes.filter(index => index !== currentQuestionIndex + 1));
    setSkippedIndexes([...skippedIndexes, currentQuestionIndex + 1]);
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestionIndex];
    setAnswers(newAnswers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex] || '';

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      setCameraStream(stream);
    });

    // Example to trigger an alert message
    setTimeout(() => {
      setAlertMessage("You are looking away from the screen.");
    }, 5000);

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
        />
        {/* <CandidateCameraFeed cameraStream={cameraStream} alertMessage={alertMessage} /> */}

        {isMcqQuestion(currentQuestion) ? (
          <McqQuestionView
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={answers[currentQuestionIndex]}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAnswer={handleAnswered}
            onClearSelection={handleClearSelection}
          />
        ) : isEssayQuestion(currentQuestion) ? (
          <EssayQuestionView
            question={currentQuestion.question}
            length={currentQuestion.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAnswer={(answer) => handleAnswered(answer)}
            onClearSelection={handleClearSelection}
            selectedAnswer={selectedAnswer}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default ExamViewPage;
