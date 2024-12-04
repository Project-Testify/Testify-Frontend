import { DeleteOutlined, RobotOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormInstance, Input, Radio, Collapse, Flex, message, InputNumber } from 'antd';
import { generateEssayQuestion, generateMCQQuestion } from '../../api/services/AIAssistant';
import { NewExamContext } from '../../context/NewExamContext';
import { useContext, useState } from 'react';
import { MCQRequest, EssayRequest } from '../../api/types';
import { addMCQ, addEssay, getQuestionSequence, updateQuestionSequence } from '../../api/services/ExamServices';
import axios from 'axios';

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

const McqForm = ({ form, loadQuestions }: { form: FormInstance, loadQuestions: () => void }) => {
  const [activeKey, setActiveKey] = useState<string | string[]>('0');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateQuestions = async () => {
    try {
      const values = await form.validateFields([
        'generatePrompt',
        'numOptions',
        'numQuestionsToGenerate',
      ]);

      setIsGenerating(true);

      const response = {
        data: {
          success: true,
          questions: [
            {
              questionText: "What is the capital of France?",
              difficultyLevel: "EASY",
              options: [
                { optionText: "Paris", marks: 1, correct: true },
                { optionText: "London", marks: 0, correct: false },
                { optionText: "Berlin", marks: 0, correct: false },
                { optionText: "Rome", marks: 0, correct: false },
              ],
            },
            {
              questionText: "Which planet is known as the Red Planet?",
              difficultyLevel: "MEDIUM",
              options: [
                { optionText: "Mars", marks: 1, correct: true },
                { optionText: "Venus", marks: 0, correct: false },
                { optionText: "Jupiter", marks: 0, correct: false },
                { optionText: "Saturn", marks: 0, correct: false },
              ],
            },
          ],
        },
      };

      // Uncomment the line below for actual API call after testing
      // const response = await axios.post('/api/generate-mcq', {
      //   prompt: values.generatePrompt,
      //   numOptions: values.numOptions,
      //   numQuestions: values.numQuestionsToGenerate,
      // });

      if (response.data.success) {
        const generatedQuestions = response.data.questions;

        for (const question of generatedQuestions) {
          const mcqRequest = {
            examId: Number(sessionStorage.getItem('examId')), // Ensure examId is a number
            questionText: question.questionText,
            difficultyLevel: 'MEDIUM', // Or handle difficulty dynamically if required
            options: question.options.map((opt: any) => ({
              optionText: opt.optionText,
              marks: opt.marks,
              correct: opt.correct,
            })),
            questionType: 'MCQ',
          };

          await handleAddQuestion(mcqRequest);
        }

        message.success('Questions generated and added successfully!');
      } else {
        message.error('Failed to generate questions: ');
      }
    } catch (error) {
      message.error('Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddQuestion = async (mcqRequest: any) => {
    try {
      const response = await addMCQ(mcqRequest.examId, mcqRequest);
      if (response.data.success) {
        const sequenceResponse = await getQuestionSequence(mcqRequest.examId);
        const currentSequence = sequenceResponse.data.questionIds;
        const newQuestionId = response.data.id;
        const updatedSequence = [...currentSequence, newQuestionId];
        await updateQuestionSequence(mcqRequest.examId, updatedSequence);

        loadQuestions();
      } else {
        message.error('Failed to add question: ' + response.data.message);
      }
    } catch (error) {
      message.error('Failed to add question.');
    }
  };

  return (
    <>
      <Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Questions" key="1" style={{ border: 0, padding: 0 }}>
          <Form.Item
            label="Question Prompt"
            name="generatePrompt"
            rules={[{ required: true, message: 'Please enter a question prompt' }]}
          >
            <Input.TextArea placeholder="Enter a base idea for the questions" />
          </Form.Item>

          <Form.Item
            label="Number of Options per Question"
            name="numOptions"
            rules={[{ required: true, message: 'Please specify the number of options' }]}
          >
            <Input type="number" min={2} max={10} />
          </Form.Item>

          <Form.Item
            label="Number of Questions to Generate"
            name="numQuestionsToGenerate"
            rules={[{ required: true, message: 'Please specify the number of questions' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          <Button
            type="primary"
            onClick={handleGenerateQuestions}
            loading={isGenerating}
            block
          >
            Generate Questions
          </Button>
        </Collapse.Panel>
      </Collapse>

      <Form.Item name="questionType" hidden initialValue="MCQ" />
      <Form.Item name="type" hidden initialValue="MCQ" />

      {/* Existing Fields for Adding a Question */}
      <Form.Item
        label="Question"
        name="questionText"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          placeholder="Enter question"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>

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

      {/* Options List */}
      <Form.Item label="Answers">
        <Form.List name={['options']}>
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {fields.map((field) => (
                <div
                  key={field.key}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
                >
                  <Form.Item
                    name={[field.name, 'optionText']}
                    rules={[{ required: true, message: 'Missing Answer' }]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <Input placeholder="Answer" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Marks' }]}
                    style={{ width: '80px', marginRight: 8 }}
                  >
                    <Input placeholder="Marks" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'correct']}
                    rules={[{ required: true, message: 'Please select if correct or wrong' }]}
                    style={{ marginRight: 8 }}
                  >
                    <Radio.Group>
                      <Radio value={true}>Correct</Radio>
                      <Radio value={false}>Wrong</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Button
                    type="text"
                    onClick={() => remove(field.name)}
                    style={{ color: 'red' }}
                    icon={<DeleteOutlined />}
                  />
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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




const EssayForm = ({
  form,
  loadQuestions,
}: {
  form: FormInstance;
  loadQuestions: () => void;
}) => {
  const [activeKey, setActiveKey] = useState<string | string[]>('0');
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to handle essay question generation
  const handleGenerateEssayQuestions = async () => {
    try {
      const values = await form.validateFields([
        'generatePrompt',
        'numCoveringPoints',
        'numQuestions',
      ]);

      const examId = sessionStorage.getItem('examId');
      if (!examId) {
        message.error('Exam ID is missing. Please select or create an exam.');
        return;
      }

      const generateRequest = {
        examId: Number(examId),
        prompt: values.generatePrompt,
        coveringOptions: values.numCoveringPoints,
        numQuestions: values.numQuestions,
      };

      console.log('Generating Essay Questions:', generateRequest);
      setIsGenerating(true);

      // Simulated API response
      const response = {
        success: true,
        data: {
          questions: [
            {
              questionText: 'Discuss the impact of technology on education in the 21st century.',
              difficultyLevel: 'MEDIUM',
              coveringPoints: [
                { coveringPointText: 'Role of online learning platforms', marks: 5 },
                { coveringPointText: 'Accessibility improvements due to technology', marks: 5 },
                { coveringPointText: 'Challenges such as digital divide', marks: 5 },
              ],
            },
            // Add more sample questions as needed
          ],
        },
      };

      if (response.success) {
        const generatedQuestions = response.data.questions;

        for (const question of generatedQuestions) {
          const essayRequest = {
            examId: Number(examId),
            questionText: question.questionText,
            difficultyLevel: question.difficultyLevel,
            coveringPoints: question.coveringPoints.map((point: any) => ({
              coverPointText: point.coveringPointText,
              marks: point.marks,
            })),
          };

          await handleAddEssay(essayRequest);
        }

        message.success('All essay questions generated and added successfully!');
        form.resetFields(['generatePrompt', 'numCoveringPoints', 'numQuestions']);
        loadQuestions();
      } else {
        message.error('Failed to generate essay questions.');
      }
    } catch (error) {
      message.error('Failed to generate essay questions. Please check your inputs.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to add a single essay question
  const handleAddEssay = async (essayRequest: any) => {
    try {
      console.log('Adding Essay:', essayRequest);
      // Simulate backend success response
      const response = { data: { success: true, id: 123 } };

      if (response.data.success) {
        message.success('Essay question added successfully.');
      } else {
        throw new Error('Error adding essay question.');
      }
    } catch (error) {
      console.error('Failed to add essay:', error);
      message.error('Failed to add essay.');
    }
  };

  return (
    <>
      <Form.Item name="questionType" hidden initialValue="ESSAY" />
      <Form.Item name="type" hidden initialValue="ESSAY" />

      <Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Questions" key="1" style={{ border: 0, padding: 0 }}>
          {/* Question Prompt */}
          <Form.Item
            label="Question Prompt"
            name="generatePrompt"
            rules={[{ required: true, message: 'Please enter a question prompt.' }]}
          >
            <Input.TextArea
              placeholder="Enter question prompt"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          {/* Number of Covering Points */}
          <Form.Item
            label="Number of Covering Points"
            name="numCoveringPoints"
            rules={[{ required: true, message: 'Please specify the number of covering points.' }]}
          >
            <InputNumber min={1} placeholder="Enter number of covering points" style={{ width: '100%' }} />
          </Form.Item>

          {/* Number of Essay Questions */}
          <Form.Item
            label="Number of Essay Questions"
            name="numQuestions"
            rules={[{ required: true, message: 'Please specify the number of questions.' }]}
          >
            <InputNumber min={1} placeholder="Enter number of questions" style={{ width: '100%' }} />
          </Form.Item>

          {/* Generate Button */}
          <Button
            type="primary"
            onClick={handleGenerateEssayQuestions}
            block
            loading={isGenerating}
          >
            Generate Essay Questions
          </Button>
        </Collapse.Panel>
      </Collapse>

      <Form.Item
        label="Question"
        name="questionText"
        rules={[{ required: true, message: 'Missing Question' }]}
      >
        <Input.TextArea placeholder="Question" autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item
        label="Difficulty"
        name="questionDifficulty"
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
        <Form.List name="coveringPoints">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'coveringPointText']}
                    rules={[{ required: true, message: 'Missing Covering Point' }]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <Input.TextArea placeholder="Covering Point" autoSize={{ minRows: 2, maxRows: 6 }} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Marks' }]}
                    style={{ width: '100px', marginRight: 8 }}
                  >
                    <InputNumber min={0} placeholder="Marks" />
                  </Form.Item>
                  <DeleteOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Covering Point
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={form.submit} block>
          Add Essay
        </Button>
      </Form.Item>
    </>
  );
};


interface AddQuestionProps {
  // handleOk: () => void;
  form: FormInstance;
  loadQuestions: () => void;
}

export const AddQuestion: React.FC<AddQuestionProps> = ({ form, loadQuestions }) => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('mcq');

  const modelContent: Record<string, React.ReactNode> = {
    mcq: <McqForm form={form} loadQuestions={loadQuestions} />,
    essay: <EssayForm form={form} loadQuestions={loadQuestions} />,
  };

  const onTab1Change = (key: string) => {
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
          Generate <RobotOutlined />
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
          Generate <RobotOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
}
