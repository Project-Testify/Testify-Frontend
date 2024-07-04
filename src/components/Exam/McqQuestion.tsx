import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

interface FieldData {
  name: string;
  key: number;
  // fieldKey: number;
}

interface McqQuestionProps {
  field?: FieldData | null;
  form?: any;
}

interface Option {
  label: string;
  value: string;
}

export const McqQuestion = ({ field = null, form = null }: McqQuestionProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  if (field === null || form === null) {
    const [form] = Form.useForm();

    const updateOptions = () => {
      const values = form.getFieldValue('answers') || [];
      const newOptions = values.map((answer: string, index: number) => ({
        label: answer,
        value: index.toString(),
      }));
      setOptions(newOptions.filter((option: Option) => option.label !== ''));
    };

    return (
      <Form form={form} name="newQuestion" initialValues={{ answers: [''] }}>
        <Form.Item label="Question" name="question">
          <Input.TextArea
            placeholder="Enter question here"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item label="Answers">
          <Form.List name="answers">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name]}
                      fieldKey={field.fieldKey !== undefined ? field.fieldKey.toString() : field.name.toString()}
                      rules={[{ required: true, message: 'Missing Answer' }]}
                    >
                      <Input placeholder="Answer" onChange={updateOptions} />
                    </Form.Item>

                    <CloseOutlined onClick={() => { remove(field.name); updateOptions(); }} />
                  </Space>
                ))}
                <Button type="dashed" block onClick={() => { add(); updateOptions(); }}>
                  + Add Answers
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label="Correct Answer" name="correctAnswer">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
      </Form>
    );
  }

  const updateOptions = () => {
    const values = form.getFieldValue('answers') || [];
    const newOptions = values.map((answer: string, index: number) => ({
      label: answer,
      value: index.toString(),
    }));
    setOptions(newOptions.filter((option: Option) => option.label !== ''));
  };

  useEffect(() => {
    updateOptions();
  }, [form, field.name]);

  return (
    <Card size="small" title={`Question ${field.name + 1}`} key={field.key}>
      <Form.Item label="Question" name={[field.name, 'question']}>
        <Input.TextArea
          placeholder="Enter question here"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item label="Answers">
        <Form.List name={[field.name, 'answers']}>
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    name={[field.name]}
                    fieldKey={field.fieldKey !== undefined ? field.fieldKey.toString() : field.name.toString()}
                    rules={[{ required: true, message: 'Missing Answer' }]}
                  >
                    <Input placeholder="Answer" onChange={updateOptions} />
                  </Form.Item>

                  <CloseOutlined onClick={() => { remove(field.name); updateOptions(); }} />
                </Space>
              ))}
              <Button type="dashed" block onClick={() => { add(); updateOptions(); }}>
                + Add Answers
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item
        label="Correct Answer"
        name={[field.name, 'correctAnswer']}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={handleChange}
          options={options}
        />
      </Form.Item>
    </Card>
  );
};

export default McqQuestion;
