import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditTwoTone,
} from '@ant-design/icons';
import { Card, Form, Input, Space, Switch, Radio, Typography } from 'antd';

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
        <Form.Item name="questionType" hidden />
        <Form.Item name="type" hidden />

        <Form.Item
          label="Question"
          rules={[{ required: true, message: 'Missing Question' }]}
          name={['questionText']}
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            defaultValue={question.questionText}
          />
        </Form.Item>

        {/* add question levet easy, medium, hard */}
        <Form.Item
          label="Difficulty"
          name={['questionDifficulty']}
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

        {/* render answers from questions.options array */}
        <Form.Item name={'answers'}>
          <Form.List name={['options']}>
            {() => (
              <Space direction="vertical">
                {question.options &&
                  question.options.map((option, index) => (
                    <Space key={index}>
                      <Form.Item
                        name={[index, 'optionText']}
                        rules={[{ required: true, message: 'Missing Answer' }]}
                      >
                        <Input
                          placeholder="Answer"
                          defaultValue={option.optionText}
                        />
                      </Form.Item>

                      <Form.Item
                        name={[index, 'marks']}
                        rules={[{ required: true, message: 'Missing Marks' }]}
                      >
                        <Input
                          placeholder="Marks"
                          defaultValue={option.marks}
                        />
                      </Form.Item>

                      <Form.Item name={[index, 'isCorrect']}>
                        <Switch
                          // defaultChecked={option.isCorrect}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                        />
                      </Form.Item>
                    </Space>
                  ))}
              </Space>
            )}
          </Form.List>
        </Form.Item>
      </>
    );
  };

  const essayForm = () => {
    return (
      <>
        <Form.Item name="questionType" hidden />
        <Form.Item name="type" hidden />

        <Form.Item
          label="Question"
          name="questionText"
          rules={[{ required: true, message: 'Missing Question' }]}
          // initialValue={question.questionText}
        >
          <Input.TextArea
            placeholder="Answer"
            autoSize={{ minRows: 2, maxRows: 6 }}
            // defaultValue={question.questionText}
          />
        </Form.Item>

        <Form.Item
          label="Difficulty"
          name={['questionDifficulty']}
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

        <Form.Item name="coveringPoints">
          <Form.List name={['coveringPoints']}>
            {() => (
              <Space direction="vertical">
                {question.coveringPoints &&
                  question.coveringPoints.map((option, index) => (
                    <Space key={index}>
                      <Form.Item>
                        <Input
                          placeholder="Answer"
                          value={option.coveringPointText}
                        />
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, message: 'Missing Marks' }]}
                      >
                        <Input
                          placeholder="Marks"
                          defaultValue={option.marks}
                        />
                      </Form.Item>
                    </Space>
                  ))}
              </Space>
            )}
          </Form.List>
        </Form.Item>
      </>
    );
  };

  const modelContent: Record<string, React.ReactNode> = {
    mcq: mcqForm(),
    essay: essayForm(),
  };

  const [form] = Form.useForm();

  const updateChange = () => {
    console.log('Form Values:', form.getFieldsValue());


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
      <Form form={form} initialValues={question} onFieldsChange={updateChange}>
        <Form.Item name="id" hidden/>
        {modelContent[question.type.toLowerCase()]}
        {/* {
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        } */}
      </Form>
    </Card>
  );
};
