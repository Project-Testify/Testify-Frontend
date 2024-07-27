import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditTwoTone,
} from '@ant-design/icons';
import {
  Card,
  Form,
  Input,
  Space,
  Switch,
  Radio,
} from 'antd';


// import Question type
import type { Question as QuestionCardType } from '../../types/questions';

interface QuestionProps {
  question: QuestionCardType;
  extra?: boolean;
  onDelete?: () => void;
  showModal?: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onDelete,
  showModal,
  extra = true,
}) => {
  const mcqForm = () => {
    return (
      <>
        <Form.Item name="questionType" hidden initialValue="MCQ" />
        <Form.Item name="type" hidden initialValue="MCQ" />

        <Form.Item label="Question"
        initialValue={question.questionText}
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            value={question.questionText}
          />
        </Form.Item>

        {/* add question levet easy, medium, hard */}
        <Form.Item
          label="Difficulty"
          name={['difficulty']}
          rules={[{ required: true, message: 'Missing Difficulty' }]}
          initialValue={'easy'}
        >
          <Radio.Group
            buttonStyle="solid"
            defaultValue={question.questionDifficulty.toLowerCase()}
          >
            <Radio.Button value="easy">Easy</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="hard">Hard</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* render answers from questions.options array */}
        <Space direction="vertical">
          {question.options &&
            question.options.map((option, index) => (
              <Space key={index}>
                <Form.Item initialValue={option.optionText}>
                  <Input placeholder="Answer" value={option.optionText} />
                </Form.Item>

                <Form.Item
                  rules={[{ required: true, message: 'Missing Marks' }]}
                  initialValue={option.marks}
                >
                  <Input placeholder="Marks" value={option.marks} />
                </Form.Item>

                <Form.Item>
                  <Switch
                    defaultChecked={option.isCorrect}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                  />
                </Form.Item>
              </Space>
            ))}
        </Space>
      </>
    );
  };

  const essayForm = () => {
    return (
      <>
        <Form.Item name="questionType" hidden initialValue="ESSAY" />
        <Form.Item name="type" hidden initialValue="ESSAY" />

        <Form.Item
          label="Question"
          // name="questionText"
          rules={[{ required: true, message: 'Missing Question' }]}
          // initialValue={question.questionText}
        >
          <Input.TextArea
            placeholder="Answer"
            autoSize={{ minRows: 2, maxRows: 6 }}
            defaultValue={question.questionText}
          />
        </Form.Item>

        <Form.Item
          label="Difficulty"
          name={['difficulty']}
          rules={[{ required: true, message: 'Missing Difficulty' }]}
        >
          <Radio.Group
            buttonStyle="solid"
            defaultValue={question.questionDifficulty}
          >
            <Radio.Button value="easy">Easy</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="hard">Hard</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Space direction="vertical">
          {question.coveringPoints &&
            question.coveringPoints.map((option, index) => (
              <Space key={index}>
                <Form.Item initialValue={option.coveringPointText}>
                  <Input
                    placeholder="Answer"
                    value={option.coveringPointText}
                  />
                </Form.Item>

                <Form.Item
                  rules={[{ required: true, message: 'Missing Marks' }]}
                  initialValue={option.marks}
                >
                  <Input placeholder="Marks" defaultValue={option.marks} />
                </Form.Item>
              </Space>
            ))}
        </Space>
      </>
    );
  };

  const modelContent: Record<string, React.ReactNode> = {
    mcq: mcqForm(),
    essay: essayForm(),
  };

  return (
    // add a edit icon to the top right of the card
    <Card
      style={{ width: '100%' }}
      title={question.type}
      extra={
        extra && (
          <Space>
            <EditTwoTone onClick={showModal} />

            <DeleteOutlined onClick={onDelete} />
          </Space>
        )
      }
    >
      {modelContent[question.type.toLowerCase()]}
    </Card>
  );
};
