import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Card, Form, Input, Space, Switch, Spin, Alert } from 'antd';
// import { Store } from 'antd/es/form/interface';
import { SetStateAction, useState } from 'react';

interface Option {
  optionText: string;
  marks: number;
  isCorrect: boolean;
}

const mcqForm = (question: { questionText: string; options: Option[] | undefined; }) => {
  return (
    <>
      <Form.Item name="questionType" hidden initialValue="MCQ" />
      <Form.Item name="type" hidden initialValue="MCQ" />

      <Form.Item label="Question" name="questionText" initialValue={question.questionText} rules={[{ required: true }]}>
        <Input.TextArea placeholder="Answer" autoSize={{ minRows: 2, maxRows: 6 }} disabled />
      </Form.Item>

      <Form.Item label="Answers">
        <Form.List name="options" initialValue={question.options}>
          {(subFields) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {subFields.map((subField) => (
                <Space key={subField.key} align="start">
                  <Form.Item name={[subField.name, 'optionText']} rules={[{ required: true, message: 'Missing Answer' }]}>
                    <Input placeholder="Answer" disabled />
                  </Form.Item>

                  <Form.Item name={[subField.name, 'marks']} rules={[{ required: true, message: 'Missing Marks' }]}>
                    <Input placeholder="Marks" disabled />
                  </Form.Item>

                  <Form.Item name={[subField.name, 'isCorrect']} valuePropName="checked">
                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} disabled />
                  </Form.Item>
                </Space>
              ))}
            </div>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
};

const essayForm = (question: { questionText: any; coveringPoints: any[] | undefined; }) => {
  return (
    <>
      <Form.Item name="questionType" hidden initialValue="ESSAY" />
      <Form.Item name="type" hidden initialValue="ESSAY" />

      <Form.Item label="Question" name="questionText" initialValue={question.questionText} rules={[{ required: true, message: 'Missing Question' }]}>
        <Input.TextArea placeholder="Answer" autoSize={{ minRows: 2, maxRows: 6 }} disabled />
      </Form.Item>

      <Form.Item label="Covering Points">
        <Form.List name="coveringPoints" initialValue={question.coveringPoints}>
          {(subFields) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {subFields.map((subField) => (
                <Space key={subField.key} align="start">
                  <Form.Item name={[subField.name, 'coveringPointText']} rules={[{ required: true, message: 'Missing Covering Point' }]}>
                    <Input placeholder="Covering Point" disabled />
                  </Form.Item>
                  <Form.Item name={[subField.name, 'marks']} rules={[{ required: true, message: 'Missing Marks' }]}>
                    <Input placeholder="Marks" disabled />
                  </Form.Item>
                </Space>
              ))}
            </div>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
};

interface QuestionsListCardProps {
  data?: any[];
  loading?: boolean;
  error?: any;
}

export function QuestionsListCard({ data = [], loading, error }: QuestionsListCardProps) {
  const [activeTabKey, setActiveTabKey] = useState<string>('mcq');

  const onTabChange = (key: SetStateAction<string>) => {
    setActiveTabKey(key);
  };

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  }

  if (error) {
    return <Alert message="Error" description="There was an error loading the questions." type="error" showIcon icon={<WarningOutlined />} />;
  }

  const mcqQuestions = data.filter((question) => question.questionType === 'MCQ');
  const essayQuestions = data.filter((question) => question.questionType === 'ESSAY');

  return (
    <Card
      title="Questions"
      tabList={[
        { key: 'mcq', tab: 'MCQ' },
        { key: 'essay', tab: 'ESSAY' }
      ]}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {activeTabKey === 'mcq' && mcqQuestions.map((question, index) => (
        <Form key={index} layout="vertical" initialValues={question}>
          {mcqForm(question)}
        </Form>
      ))}

      {activeTabKey === 'essay' && essayQuestions.map((question, index) => (
        <Form key={index} layout="vertical" initialValues={question}>
          {essayForm(question)}
        </Form>
      ))}
    </Card>
  );
}

export default QuestionsListCard;
