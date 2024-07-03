import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Flex } from 'antd';
import { useEffect, useState } from 'react';

export const McqQuestion = ({ field = null, form = null }) => {
  const [options, setOptions] = useState([]);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  if (field === null || form === null) {
    const [form] = Form.useForm();

    const updateOptions = () => {
      const values = document.getElementsByName('newQuestion').values();
      console.log(values);
    };

    return (
      <Form name='newQuestion' initialValues={{ items: [{}] }}>
        <Form.Item label="Question" name="question">
          <Input.TextArea
            placeholder="Enter question here"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>

        {/* Nest Form.List */}
        <Form.Item label="Answers">
          <Form.List name={'answers'}>
            {(subFields, subOpt) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 16,
                }}
              >
                {subFields.map((subField) => (
                  <Flex gap={'middle'}>
                    <Form.Item noStyle name={subField.name}>
                      <Input placeholder="Asnswer" />
                    </Form.Item>

                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                        // updateOptions();
                      }}
                    />
                  </Flex>
                ))}
                <Button
                  type="dashed"
                  block
                  onClick={() => {
                    // check if the last answer is empty
                    // const values = form.getFieldValue('items') || [];
                    // const answers = values[field.name]?.answers || [];
                    // if (
                    //   answers.length === 0 ||
                    //   answers[answers.length - 1] !== undefined
                    // ) {

                    subOpt.add();
                    updateOptions();
                    // }
                  }}
                >
                  + Add Answers
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        {/*add correct answer as a select multiple of the added answers*/}

        <Form.Item label="Correct Answer" name={'correctAnswer'} shouldUpdate>
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
    const values = form.getFieldValue('items') || [];
    const answers = values[field.name]?.answers || [];
    const newOptions = answers.map(
      (answer: any, index: { toString: () => any }) => {
        return {
          label: answer,
          value: index.toString(),
        };
      }
    );
    // remove tuples with empty labels
    setOptions(newOptions.filter((option) => option.label !== ''));
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

      {/* Nest Form.List */}
      <Form.Item label="Answers">
        <Form.List name={[field.name, 'answers']}>
          {(subFields, subOpt) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 16,
              }}
            >
              {subFields.map((subField) => (
                <Flex gap={'middle'}>
                  <Form.Item noStyle name={subField.name}>
                    <Input placeholder="Asnswer" onChange={updateOptions} />
                  </Form.Item>

                  <CloseOutlined
                    onClick={() => {
                      subOpt.remove(subField.name);
                      updateOptions();
                    }}
                  />
                </Flex>
              ))}
              <Button
                type="dashed"
                block
                onClick={() => {
                  // check if the last answer is empty
                  const values = form.getFieldValue('items') || [];
                  const answers = values[field.name]?.answers || [];
                  if (
                    answers.length === 0 ||
                    answers[answers.length - 1] !== undefined
                  ) {
                    subOpt.add();
                  }
                }}
              >
                + Add Answers
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
      {/*add correct answer as a select multiple of the added answers*/}

      <Form.Item
        label="Correct Answer"
        name={[field.name, 'correctAnswer']}
        shouldUpdate
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
