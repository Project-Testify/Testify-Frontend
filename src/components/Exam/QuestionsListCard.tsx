import { LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { Space, Spin, Alert, Modal } from 'antd';
import { Question } from './Question';
import { useEffect, useState } from 'react';
import { useFetchData } from '../../hooks';
import { Question as QuestionType } from '../../types';

export function QuestionsListCard() {
  const {
    data: questionData = [],
    error: questionError,
    loading: questionLoading,
  } = useFetchData('../mocks/Questions.json');

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [modelData, setModelData] = useState<QuestionType | null>(null);

  useEffect(() => {
    setQuestions(questionData);
  }, [questionData]);

  const deleteQuestion = (id: number) => {
    const newQuestions = questions.filter((question: QuestionType) => question.id !== id);
    console.log(newQuestions);
    setQuestions([...newQuestions]);  // Create a new array reference
  };

  const updateQuestion = () => {
    console.log("Update question");
    setIsVisible(false);
  };

  const showModel = (question: QuestionType) => {
    setModelData(question);
    setIsVisible(true);
  };

  if (questionLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }

  if (questionError) {
    return (
      <Alert
        message="Error"
        description="There was an error loading the questions."
        type="error"
        showIcon
        icon={<WarningOutlined />}
      />
    );
  }

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        {questions.map((question: QuestionType) => (
          <Question
            question={question}
            key={question.id}
            onDelete={() => deleteQuestion(question.id)}
            showModal={() => showModel(question)}
          />
        ))}
      </Space>

      {modelData && (
        <Modal
          title="Update Question"
          open={isVisible}
          onOk={updateQuestion}
          onCancel={() => setIsVisible(false)}
        >
          <Question question={modelData} extra={false} />
        </Modal>
      )}
    </>
  );
}

export default QuestionsListCard;
