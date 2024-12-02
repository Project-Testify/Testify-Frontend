import React from 'react';
import { Card, Button, Space, Input } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

type Option = {
  optionId: string;
  optionText: string;
  correct: boolean;
  marks: number;
};

type CoverPoint = {
  coverPointId: string;
  coverPointText: string;
  marks: number;
};

type Question = {
  questionId: string;
  questionText: string;
  options?: Option[];
  coverPoints?: CoverPoint[];
};

const QuestionCard = ({ question, index }: { question: Question; index: number }) => {
  return (
    <Card
      style={{
        background: 'rgba(200, 200, 200, 0.2)', // Neutral glass effect
        backdropFilter: 'blur(10px)',
        marginBottom: '24px',
      }}
      title={`Question ${index + 1}: ${question.questionText}`}
    >
      <ul>
        {question.options &&
          question.options.map(option => (
            <li key={option.optionId} style={{ marginBottom: '8px' }}>
              {option.optionText}
              <Space style={{ marginLeft: '8px' }}>
                {option.correct ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
                <span>Marks: {option.marks}</span>
              </Space>
            </li>
          ))}

        {question.coverPoints &&
          question.coverPoints.map(point => (
            <li key={point.coverPointId}>
              {point.coverPointText} - <span>Marks: {point.marks}</span>
            </li>
          ))}
      </ul>
      <div style={{ marginTop: '16px' }}>
        <Input.TextArea 
          placeholder="Add your comment here..." 
          rows={2} 
          style={{ width: '100%' }} 
        />
        <div style={{ marginTop: '8px', textAlign: 'right' }}>
          <Button type="primary">Add Comment</Button>
        </div>
      </div>
    </Card>
  );
};

export const ModeratingExam: React.FC = () => {
  const questions: Question[] = [
    {
      questionId: '1',
      questionText: 'What is the time complexity of binary search?',
      options: [
        { optionId: '1', optionText: 'O(n)', correct: false, marks: 0 },
        { optionId: '2', optionText: 'O(log n)', correct: true, marks: 1 },
        { optionId: '3', optionText: 'O(n^2)', correct: false, marks: 0 },
        { optionId: '4', optionText: 'O(1)', correct: false, marks: 0 },
      ],
    },
    {
      questionId: '2',
      questionText: 'Which data structure is used in a stack?',
      options: [
        { optionId: '1', optionText: 'Queue', correct: false, marks: 0 },
        { optionId: '2', optionText: 'Array', correct: true, marks: 1 },
        { optionId: '3', optionText: 'Tree', correct: false, marks: 0 },
        { optionId: '4', optionText: 'Graph', correct: false, marks: 0 },
      ],
    },
    {
      questionId: '3',
      questionText: 'Explain the differences between arrays and linked lists.',
      coverPoints: [
        { coverPointId: '1', coverPointText: 'Static vs Dynamic Memory Allocation', marks: 2 },
        { coverPointId: '2', coverPointText: 'Access time and traversal', marks: 3 },
      ],
    },
    {
      questionId: '4',
      questionText: 'Describe the divide-and-conquer algorithm with examples.',
      coverPoints: [
        { coverPointId: '1', coverPointText: 'Divide, conquer, and combine steps', marks: 3 },
        { coverPointId: '2', coverPointText: 'Examples like merge sort and quick sort', marks: 2 },
      ],
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>DSA 1201: Inclass 01</h1>
      {questions.map((question, index) => (
        <QuestionCard key={question.questionId} question={question} index={index} />
      ))}
    </div>
  );
};

