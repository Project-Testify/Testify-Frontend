import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormInstance, Input, Space, Switch, Radio, Typography } from 'antd';

import { useState } from 'react';

const tabList = [
  {
    key: 'mcq',
    tab: 'MCQ',
  },
  {
    key: 'essay',
    tab: 'ESSAY',
  },
];

const mcqForm = () => {
  return (
    <>
      <Form.Item name="questionType" hidden initialValue="MCQ" />
      <Form.Item name="type" hidden initialValue="MCQ" />

      <Form.Item
        label="Question"
        name="questionText"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          placeholder="Answer"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

      {/* add question levet easy, medium, hard */}
      <Form.Item
        label="Difficulty"
        name={['difficulty']}
        rules={[{ required: true, message: 'Missing Difficulty' }]}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="easy">Easy</Radio.Button>
          <Radio.Button value="medium">Medium</Radio.Button>
          <Radio.Button value="hard">Hard</Radio.Button>
        </Radio.Group>
      </Form.Item>


      <Form.Item label="Answers">
        <Form.List name={['options']}>
          {(subFields, subOpt) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                  <Form.Item
                    name={[subField.name, 'optionText']}
                    rules={[{ required: true, message: 'Missing Answer' }]}
                  >
                    <Input placeholder="Answer" />
                  </Form.Item>

                  <Form.Item
                    name={[subField.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Marks' }]}
                  >
                    <Input placeholder="Marks" />
                  </Form.Item>

                  <Form.Item name={[subField.name, 'isCorrect']}>
                    <Switch
                      defaultChecked={false}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      subOpt.remove(subField.name);
                    }}
                  />
                </Space>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()} block>
                + Add Answer
              </Button>
            </div>
          )}
        </Form.List>
        
      </Form.Item>
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
        name="questionText"
        rules={[{ required: true, message: 'Missing Question' }]}
      >
        <Input.TextArea
          placeholder="Answer"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item
        label="Difficulty"
        name={['questionDifficulty']}
        rules={[{ required: true, message: 'Missing Difficulty' }]}
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="easy">Easy</Radio.Button>
          <Radio.Button value="medium">Medium</Radio.Button>
          <Radio.Button value="hard">Hard</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Covering Points">
        <Form.List name={['coveringPoints']}>
          {(subFields, subOpt) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                  <Form.Item
                    name={[subField.name, 'coveringPointText']}
                    rules={[
                      { required: true, message: 'Missing Covering Point' },
                    ]}
                  >
                    <Input placeholder="coveringPoint" />
                  </Form.Item>
                  <Form.Item
                    name={[subField.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Answer' }]}
                  >
                    <Input placeholder="Marks" />
                  </Form.Item>

                  <CloseOutlined
                    onClick={() => {
                      subOpt.remove(subField.name);
                    }}
                  />
                </Space>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()} block>
                + Add Covering Point
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
};
interface AddQuestionProps {
  // handleOk: () => void;
  form: FormInstance;
}

export const AddQuestion: React.FC<AddQuestionProps> = ({ form }) => {
  // console.log(handleOk);
  const [activeTabKey1, setActiveTabKey1] = useState<string>('mcq');

  const modelContent: Record<string, React.ReactNode> = {
    mcq: mcqForm(),
    essay: essayForm(),
  };

  const onTab1Change = (key: string) => {
    // clear values of the form
    form.resetFields();

    form.setFieldsValue({ questionType: key.toUpperCase() });
    form.setFieldsValue({ type: key.toUpperCase() });

    setActiveTabKey1(key);
  };

  return (
    <Card
      style={{ width: '100%' }}
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={onTab1Change}
      tabProps={{
        size: 'middle',
      }}
    >
      {modelContent[activeTabKey1]}
      <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
    </Card>
  );
};
