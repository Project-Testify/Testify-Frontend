import { CheckOutlined, CloseOutlined,OpenAIOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormInstance, Input, Switch, Radio, Collapse, Flex } from 'antd';

import {generateEssayQuestion, generateMCQQuestion} from '../../api/services/AIAssistant';

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

const McqForm = ({ form } : {form: FormInstance}) => {
  const [activeKey, setActiveKey] = useState<string | string[]>('0');

  return (
    <>
      <Form.Item name="questionType" hidden initialValue="MCQ" />
      <Form.Item name="type" hidden initialValue="MCQ" />

      <Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Question" key="1" style={{ border: 0, padding: 0 }} >
          <GenerateMCQQuestion form={form} setActiveKey={setActiveKey} />
        </Collapse.Panel>
      </Collapse>

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
                <Flex key={subField.key} style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 8 }}>
                  <Form.Item
                    name={[subField.name, 'optionText']}
                    rules={[{ required: true, message: 'Missing Answer' }]}
                    style={{ flex: 1, marginRight: 8 , marginBottom:0  , width:'300px', justifySelf: 'center' }} // Make textarea flexible and occupy remaining space

                  >
                    <Input.TextArea placeholder="Answer" 
                    autoSize={{ minRows: 2, maxRows: 6 }}
                   // Control the width of the input for covering point
                    style={{ flex: 1, marginRight: 8  }}  // Make textarea flexible and occupy remaining space

                    />
                  </Form.Item>

                  <Form.Item
                    name={[subField.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Marks' }]}
                    style={{ flex: 1, marginRight: 8 , marginBottom:0  }}  // Make textarea flexible and occupy remaining space

                  >
                    <Input placeholder="Marks" />
                  </Form.Item>

                  <Form.Item name={[subField.name, 'isCorrect']}
                      style={{  marginRight: 8, marginBottom:0   }}  // Make textarea flexible and occupy remaining space

                  >
                    <Switch
                      defaultChecked={false}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>

                  <Button
    type="text"
    onClick={() => subOpt.remove(subField.name)}
    style={{ marginLeft: 'auto', color: 'red', border: 'none', padding: 0 }} // Ensures button has no border or background
    icon={<CloseOutlined />}
  />

                </Flex>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()} block icon={<PlusOutlined />}>
                Add Answer
              </Button>
            </div>
          )}
        </Form.List>
        
      </Form.Item>
    </>
  );
};
const EssayForm = ({ form } : {form: FormInstance}) => {
  // const [showPrompt, setShowPrompt] = useState(false);
  const [activeKey, setActiveKey] = useState<string | string[]>('0');

  // const handleGenerateClick = () => {
  //   setShowPrompt(!showPrompt);
  //   form.resetFields();  // Reset other fields when showing the prompt
  // };
  return (
    <>

      <Form.Item name="questionType" hidden initialValue="ESSAY" />
      <Form.Item name="type" hidden initialValue="ESSAY" />

{/* Button for AI generate  */}
{/* end */}
<Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Question" key="1" style={{ border: 0, padding: 0 }}>
          <GenerateEssayQuestion form={form}  setActiveKey={setActiveKey} />
        </Collapse.Panel>
      </Collapse>


{/* <Flex justify='end'>

     <Button  style={{marginBottom: 16}} onClick={handleGenerateClick} 
     ><OpenAIOutlined />  {showPrompt ? 'Hide Prompt' : 'Generate Prompt'}</Button>
</Flex> */}

{/* Prompt for question generate, hidden  */}



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
        style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '100%' }}
      >
        {subFields.map((subField) => (
          <Flex key={subField.key} style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 8 }}>
            <Form.Item
              name={[subField.name, 'coveringPointText']}
              rules={[{ required: true, message: 'Missing Covering Point' }]}
              style={{ flex: 1, marginRight: 8 ,marginBottom:0 , width:'300px', justifySelf: 'center' }} // Make textarea flexible and occupy remaining space
            >
              <Input.TextArea
                placeholder="Covering Point"
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ flex: 1 }} // Control the width of the input for covering point
              />
            </Form.Item>
            <Form.Item
              name={[subField.name, 'marks']}
              rules={[{ required: true, message: 'Missing Marks' }]}
              style={{ flex: 1, marginRight: 8 , marginBottom:0  }}  // Make textarea flexible and occupy remaining space
            >
              <Input placeholder="Marks" />
            </Form.Item>

            <Button
    type="text"
    onClick={() => subOpt.remove(subField.name)}
    style={{ marginLeft: 'auto', color: 'red', border: 'none', padding: 0 }} // Ensures button has no border or background
    icon={<CloseOutlined />}
  />
          </Flex>
        ))}
        <Button type="dashed" onClick={() => subOpt.add()} block icon={<PlusOutlined />}>
          Add Covering Point
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
    mcq: McqForm({form}),
    essay: EssayForm({ form }),
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
      {/* <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                 <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item> */}
    </Card>
  );
};

const GenerateEssayQuestion = ({ form ,setActiveKey}: {form: FormInstance,setActiveKey: (key: string | string[]) => void }) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const promptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }

  const handleGenerateClick = async () => {
    setLoading(true);
    try {


      console.log('example-exam-id');

      const response = await generateEssayQuestion({text: prompt, examid: 'example-exam-id'});
      if (response.data) {
        console.log(response.data);
        form.setFieldsValue({
          questionText: response.data.question,

          coveringPoints: response.data.valid_answers.map((answer: string) => ({
            coveringPointText: answer,
            marks: 1,
          })),
        });
      }
      setActiveKey('0');
    } catch (error) {
      console.error('Failed to fetch question', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Item
        label="Prompt"
        name="prompt"
        rules={[{ required: true, message: 'Missing Prompt' }]}
      >
        <Input.TextArea
          placeholder="Enter prompt for generating question"
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={promptChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleGenerateClick} loading={loading}>
          Generate <OpenAIOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};



const GenerateMCQQuestion = ({ form,setActiveKey }: {form: FormInstance,setActiveKey: (key: string | string[]) => void }) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [choices, setChoices] = useState(4);

  const promptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }
  const choicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoices(parseInt(e.target.value));
  }

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const response = await generateMCQQuestion({text: prompt, examid: 'example-exam-id', choices});
      if (response.data) {
        console.log(response.data);
        form.setFieldsValue({
          questionText: response.data.question,
          options: response.data.options.map((option: string) => ({
            optionText: option,
            marks: 1,
            isCorrect: response.data.correct_answer === option,
          })),
        });
      }
      setActiveKey('0');
    } catch (error) {
      console.error('Failed to fetch question', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Item
        label="Prompt"
        name="prompt"
        rules={[{ required: true, message: 'Missing Prompt' }]}
      >
        <Input.TextArea
          placeholder="Enter prompt for generating question"
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={promptChange}
        />
      </Form.Item>
      <Form.Item
        label="Number of Choices"
        name="choices"
        rules={[{ required: true, message: 'Missing Choices' }]}
      >
        <Input type="number" onChange={choicesChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleGenerateClick} loading={loading}>
          Generate <OpenAIOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
}