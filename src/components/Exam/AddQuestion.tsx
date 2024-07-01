import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Switch, Typography } from 'antd';
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
      <Form.Item label="Question" name="questionText">
        <Input.TextArea
          placeholder="Answer"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item name="questionType" hidden initialValue="MCQ" />
      <Form.Item name="type" hidden initialValue="MCQ" />

      <Form.Item label="Answers">
        <Form.List name={['options']}>
          {(subFields, subOpt) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                  <Form.Item noStyle name={[subField.name, 'optionText']}>
                    <Input placeholder="Answer" />
                  </Form.Item>
                  <Form.Item noStyle name={[subField.name, 'marks']}>
                    <Input placeholder="Marks" />
                  </Form.Item>
                  <Form.Item noStyle name={[subField.name, 'isCorrect']}>
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
      <Form.Item name="questionType" hidden initialValue={'ESSAY'} />
      <Form.Item name="type" hidden initialValue={'ESSAY'} />

      <Form.Item label="Question" name="questionText">
        <Input.TextArea
          placeholder="Answer"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
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
                    noStyle
                    name={[subField.name, 'coveringPointText']}
                  >
                    <Input placeholder="coveringPoint" />
                  </Form.Item>
                  <Form.Item noStyle name={[subField.name, 'marks']}>
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

export const AddQuestion = () => {
  const [form] = Form.useForm();
  const [activeTabKey1, setActiveTabKey1] = useState<string>('mcq');

  const modelContent: Record<string, React.ReactNode> = {
    mcq: mcqForm(),
    essay: essayForm(),
  };

  const onTab1Change = (key: string) => {
    // clear values of the form
    form.resetFields();
    
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
      <Form
        form={form}
        onFinish={(values) => {
          console.log(values);
        }}
      >
        {modelContent[activeTabKey1]}

        <Form.Item noStyle shouldUpdate>
          {(form) => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};
