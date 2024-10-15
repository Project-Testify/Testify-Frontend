import { CloseOutlined, DeleteOutlined, OpenAIOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormInstance, Input, Radio, Collapse, Flex, message } from 'antd';
import { generateEssayQuestion, generateMCQQuestion } from '../../api/services/AIAssistant';
import { NewExamContext } from '../../context/NewExamContext';
import { useContext, useState } from 'react';
import { MCQRequest } from '../../api/types';
import { addMCQ } from '../../api/services/ExamServices';

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

const McqForm = ({ form }: { form: FormInstance }) => {
  const [activeKey, setActiveKey] = useState<string | string[]>('0');


  const handleAddQuestion = async () => {
    try {
      const values = await form.validateFields();

      // const examId = sessionStorage.getItem('editingExamId');
      const examId = 1;
      if (!examId) {
        message.error('Exam ID is missing. Please select or create an exam.');
        return;
      }

      const mcqRequest: MCQRequest = {
        examId: Number(examId), // Ensure examId is a number
        questionText: values.questionText,
        difficultyLevel: values.difficulty,
        options: values.options.map((option: { optionText: any; marks: any; correct: any; }) => ({
          optionText: option.optionText,
          marks: option.marks,
          correct: option.correct,
        })),
        questionType: 'MCQ',
      };

      console.log('Submitting MCQ Data:', mcqRequest);
      const response = await addMCQ(Number(examId), mcqRequest);
      if (response.data.success) {
        message.success('MCQ added successfully!');
        form.resetFields();
      } else {
        message.error('Failed to add MCQ: ' + response.data.message);
      }
    } catch (error) {

      message.error('Failed to add question. Please check your inputs.');
    }
  };

  return (
    <>
      <Form.Item name="questionType" hidden initialValue="MCQ" />
      <Form.Item name="type" hidden initialValue="MCQ" />

      <Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Question" key="1" style={{ border: 0, padding: 0 }}>
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

      {/* add question level easy, medium, hard */}
      <Form.Item
        label="Difficulty"
        name={['difficulty']}
        rules={[{ required: true, message: 'Missing Difficulty' }]}
        initialValue="EASY"
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="EASY">Easy</Radio.Button>
          <Radio.Button value="MEDIUM">Medium</Radio.Button>
          <Radio.Button value="HARD">Hard</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Answers">
        <Form.List name={['options']}>
          {(subFields, subOpt) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {subFields.map((subField) => (
                <Flex key={subField.key} style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 8 }}>
                  <Form.Item
                    name={[subField.name, 'optionText']}
                    rules={[{ required: true, message: 'Missing Answer' }]}
                    style={{ flex: 1, marginRight: 8, marginBottom: 0, width: '300px', justifySelf: 'center' }}
                  >
                    <Input.TextArea
                      placeholder="Answer"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      style={{ flex: 1, marginRight: 8 }}
                    />
                  </Form.Item>

                  <Form.Item
                    name={[subField.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Marks' }]}
                    style={{ marginRight: 8, marginBottom: 0, width: '80px' }}
                  >
                    <Input placeholder="Marks" />
                  </Form.Item>

                  <Form.Item
                    name={[subField.name, 'correct']}
                    rules={[{ required: true, message: 'Please select if correct or wrong' }]}
                    style={{ marginRight: 8, marginBottom: 0 }}
                    initialValue={true} // This can stay as true since it's a boolean
                  >
                    <Radio.Group>
                      <Radio value={true}>Correct</Radio>
                      <Radio value={false}>Wrong</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Button
                    type="text"
                    onClick={() => subOpt.remove(subField.name)}
                    style={{ marginLeft: 'auto', color: 'red', border: 'none', padding: 0 }}
                    icon={<DeleteOutlined />}
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

      <Form.Item>
        <Button type="primary" onClick={handleAddQuestion} block>
          Add Question
        </Button>
      </Form.Item>

    </>
  );
};




const EssayForm = ({ form }: { form: FormInstance }) => {
  const [activeKey, setActiveKey] = useState<string | string[]>('0');

  return (
    <>

      <Form.Item name="questionType" hidden initialValue="ESSAY" />
      <Form.Item name="type" hidden initialValue="ESSAY" />

      <Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Question" key="1" style={{ border: 0, padding: 0 }}>
          <GenerateEssayQuestion form={form} setActiveKey={setActiveKey} />
        </Collapse.Panel>
      </Collapse>


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
        initialValue="EASY"
      >
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="EASY">Easy</Radio.Button>
          <Radio.Button value="MEDIUM">Medium</Radio.Button>
          <Radio.Button value="HARD">Hard</Radio.Button>
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
                    style={{ flex: 1, marginRight: 8, marginBottom: 0, width: '300px', justifySelf: 'center' }} // Make textarea flexible and occupy remaining space
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
                    style={{ flex: 1, marginRight: 8, marginBottom: 0 }}  // Make textarea flexible and occupy remaining space
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
    mcq: McqForm({ form }),
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

const GenerateEssayQuestion = ({ form, setActiveKey }: { form: FormInstance, setActiveKey: (key: string | string[]) => void }) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const context = useContext(NewExamContext);

  if (!context) {
    throw new Error('useNewExamState must be used within a NewExamProvider');
  }

  const { newExamState } = context;

  // if (!newExamState.examId) {
  //   message.error('Error: Exam ID is missing');

  //   // throw new Error('Error: Exam ID is missing');
  // }

  const promptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }

  const handleGenerateClick = async () => {
    setLoading(true);
    try {


      console.log('examid', newExamState.examId);

      const response = await generateEssayQuestion({ text: prompt, examid: newExamState.examId || 'example-exam-id' });
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



const GenerateMCQQuestion = ({ form, setActiveKey }: { form: FormInstance, setActiveKey: (key: string | string[]) => void }) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [choices, setChoices] = useState(4);


  const context = useContext(NewExamContext);

  if (!context) {
    throw new Error('useNewExamState must be used within a NewExamProvider');
  }

  const { newExamState } = context;

  // if (!newExamState.examId) {
  //   message.error('Error: Exam ID is missing');

  //   // throw new Error('Error: Exam ID is missing');
  // }


  const promptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }
  const choicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoices(parseInt(e.target.value));
  }

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const response = await generateMCQQuestion({ text: prompt, examid: newExamState.examId || 'example-exam-id', choices });
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