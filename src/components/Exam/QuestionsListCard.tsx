import { LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { Space, Spin, Alert, Modal } from 'antd';
import { Question } from './Question';
import { useEffect, useState } from 'react';
import { useFetchData } from '../../hooks';
import { Question as QuestionType } from '../../types';
import { set } from 'lodash';


export function QuestionsListCard() {
  const {
    data: questionData = [],
    error: questionError,
    loading: questionLoading,
  } = useFetchData('../mocks/Questions.json');

  
  const [questions, setQuestions] = useState(questionData);

  const [isVisible, setIsVisible] = useState(false);

  const [modelData, setModelData] = useState<QuestionType | null>(null);

  useEffect(() => {
    setQuestions(questionData);
  }, [questionData, ]);

  const deleteQuestion = (index: number) => {
    // remove the question from the questions array
    const newQuestions = questions.filter(
      (question: QuestionType) => question.id !== index
    );
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number) => {
    // console.log("Update question", index);
  };

  const showModel = (question: QuestionType) => {

    setModelData(question);

    // create a form instance and set the values of the question

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
        {questions.map((question: QuestionType, index: number) => (
          <Question
            question={question}
            key={index}
            onDelete={() => deleteQuestion(question.id)}
            showModal={() => showModel(question)}
          />
        ))}
      </Space>

      {modelData && (
        <Modal
          title="Update Question"
          open={isVisible}
          onOk={() => setIsVisible(false)}
          onCancel={() => setIsVisible(false)}
        >
          <Question question={modelData} extra={false} />
        </Modal>
      )}
    </>
  );
}

export default QuestionsListCard;
