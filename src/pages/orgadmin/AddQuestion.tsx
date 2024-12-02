import { DeleteOutlined, RobotOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormInstance, Input, Radio, Collapse, Flex, message } from 'antd';
import { generateEssayQuestion, generateMCQQuestion } from '../../api/services/AIAssistant';
import { NewExamContext } from '../../context/NewExamContext';
import { useContext, useState } from 'react';
import { MCQRequest, EssayRequest } from '../../api/types';
import { addMCQ, addEssay, getQuestionSequence, updateQuestionSequence } from '../../api/services/ExamServices';

import {generateMCQQuestionList,generateEssayQuestionList} from '../../api/services/AIAssistant';

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
  const examId = sessionStorage.getItem('examId');

  const handleGenerateQuestions = async () => {
    try {
      const values = await form.validateFields([
        'generatePrompt',
        'numOptions',
        'numQuestionsToGenerate',
      ]);

      setIsGenerating(true);

      // const response = {
      //   data: {
      //     success: true,
      //     questions: [
      //       {
      //         questionText: "What is the capital of France?",
      //         difficultyLevel: "EASY",
      //         options: [
      //           { optionText: "Paris", marks: 1, correct: true },
      //           { optionText: "London", marks: 0, correct: false },
      //           { optionText: "Berlin", marks: 0, correct: false },
      //           { optionText: "Rome", marks: 0, correct: false },
      //         ],
      //       },
      //       {
      //         questionText: "Which planet is known as the Red Planet?",
      //         difficultyLevel: "MEDIUM",
      //         options: [
      //           { optionText: "Mars", marks: 1, correct: true },
      //           { optionText: "Venus", marks: 0, correct: false },
      //           { optionText: "Jupiter", marks: 0, correct: false },
      //           { optionText: "Saturn", marks: 0, correct: false },
      //         ],
      //       },
      //     ],
      //   },
      // };

      // Uncomment the line below for actual API call after testing
      // const response = await axios.post('/api/generate-mcq', {
      //   examId: Number(examId),
      //   prompt: values.generatePrompt,
      //   numOptions: values.numOptions,
      //   numQuestions: values.numQuestionsToGenerate,
      // });

      const response = await generateMCQQuestionList({
        text: values.generatePrompt,
        examid: examId || 'ct',
        choices: values.numOptions,
        num_questions: values.numQuestionsToGenerate,
      });

      if (response.data.success) {
        const generatedQuestions = response.data.questions;

        for (const question of generatedQuestions) {
          const mcqRequest: MCQRequest = {
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

          await handleAddQuestionWithParameters({ ...mcqRequest, questionType: 'MCQ' });

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

  const handleAddQuestionWithParameters = async (generatedMCQ: MCQRequest) => {
    try {

      const examId = sessionStorage.getItem('examId');
      if (!examId) {
        message.error('Exam ID is missing. Please select or create an exam.');
        return;
      }

      const mcqRequest: MCQRequest = {
        examId: Number(examId), // Ensure examId is a number
        questionText: generatedMCQ.questionText,
        difficultyLevel: generatedMCQ.difficultyLevel,
        options: generatedMCQ.options,
        questionType: 'MCQ',
      };

      console.log('Submitting MCQ Data:', mcqRequest);
      const response = await addMCQ(Number(examId), mcqRequest);
      if (response.data.success) {
        message.success('MCQ added successfully!');

        const sequenceResponse = await getQuestionSequence(Number(examId));
        const currentSequence = sequenceResponse.data.questionIds;
        const newQuestionId = response.data.id;
        const updatedSequence = [...currentSequence, newQuestionId];
        await updateQuestionSequence(Number(examId), updatedSequence);

        loadQuestions();
        form.resetFields();
      } else {
        message.error('Failed to add MCQ: ' + response.data.message);
      }
    } catch (error) {

      message.error('Failed to add question. Please check your inputs.');
    }
  };


  const handleAddQuestion = async () => {
    try {
      const values = await form.validateFields();

      // const examId = sessionStorage.getItem('editingExa mId');
      const examId = sessionStorage.getItem('examId');
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

        const sequenceResponse = await getQuestionSequence(Number(examId));
        const currentSequence = sequenceResponse.data.questionIds;
        const newQuestionId = response.data.id;
        const updatedSequence = [...currentSequence, newQuestionId];
        await updateQuestionSequence(Number(examId), updatedSequence);

        loadQuestions();
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




const EssayForm = ({ form, loadQuestions }: { form: FormInstance, loadQuestions: () => void }) => {
  const [activeKey, setActiveKey] = useState<string | string[]>('0');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const examId = sessionStorage.getItem('examId');

  const handleGenerateQuestions = async () => {
    try {
      const values = await form.validateFields([
        'generatePrompt',
        // 'numCoverPoints',
        'numQuestionsToGenerate',
      ]);

      setIsGenerating(true);

      // const response = {
      //   data: {
      //     success: true,
      //     questions: [
      //       {
      //         questionText: 'Discuss the impact of technology on education in the 21st century.',
      //         difficultyLevel: 'MEDIUM',
      //         coveringPoints: [
      //           { coveringPointText: 'Role of online learning platforms', marks: 5 },
      //           { coveringPointText: 'Accessibility improvements due to technology', marks: 5 },
      //           { coveringPointText: 'Challenges such as digital divide', marks: 5 },
      //         ],
      //       }
      //     ],
      //   },
      // };

      // Uncomment the line below for actual API call after testing
      // const response = await axios.post('/api/generate-mcq', {
      //   examId: Number(examId),
      //   prompt: values.generatePrompt,
      //   numOptions: values.numOptions,
      //   numQuestions: values.numQuestionsToGenerate,
      // });

      const response = await generateEssayQuestionList({
        text: values.generatePrompt,
        examid: examId || 'ct',
        num_questions: values.numQuestionsToGenerate,
      });


      if (response.data.success) {
        const generatedQuestions = response.data.questions;

        for (const question of generatedQuestions) {
          const essayRequest: EssayRequest = {
            examId: Number(sessionStorage.getItem('examId')), // Ensure examId is a number
            questionText: question.questionText,
            difficultyLevel: 'MEDIUM', // Or handle difficulty dynamically if required
            coveringPoints: question.coveringPoints.map((coverPoint: any) => ({
              coverPointText: coverPoint.coveringPointText,
              marks: coverPoint.marks
            })),
          };

          await handleAddEssayWithParameters(essayRequest);

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

  const handleAddEssayWithParameters = async (question: any) => {
    try {
      const examId = sessionStorage.getItem('examId');
      if (!examId) {
        message.error('Exam ID is missing. Please select or create an exam.');
        return;
      }

      // Build the essay request object
      const essayRequest: EssayRequest = {
        examId: Number(examId),
        questionText: question.questionText,
        difficultyLevel: question.difficultyLevel,
        coveringPoints: question.coveringPoints
      };

      console.log('Submitting Essay Data:', essayRequest);

      const response = await addEssay(Number(examId), essayRequest); // Assume `addEssay` is the API call function
      if (response.data.success) {
        message.success('Essay added successfully!');

        const sequenceResponse = await getQuestionSequence(Number(examId));
        const currentSequence = sequenceResponse.data.questionIds;
        const newQuestionId = response.data.id;
        const updatedSequence = [...currentSequence, newQuestionId];
        await updateQuestionSequence(Number(examId), updatedSequence);

        loadQuestions();
        form.resetFields();
      } else {
        message.error('Failed to add essay: ' + response.data.message);
      }
    } catch (error) {
      message.error('Failed to add essay. Please check your inputs.');
    }
  };

  // Define the handleAddEssay function
  const handleAddEssay = async () => {
    try {
      const values = await form.validateFields();

      const examId = sessionStorage.getItem('examId');
      if (!examId) {
        message.error('Exam ID is missing. Please select or create an exam.');
        return;
      }

      // Build the essay request object
      const essayRequest: EssayRequest = {
        examId: Number(examId),
        questionText: values.questionText,
        difficultyLevel: values.questionDifficulty,
        coveringPoints: values.coveringPoints.map((point: { coveringPointText: string; marks: number }) => ({
          coverPointText: point.coveringPointText,
          marks: point.marks,
        })),
      };

      console.log('Submitting Essay Data:', essayRequest);

      const response = await addEssay(Number(examId), essayRequest); // Assume `addEssay` is the API call function
      if (response.data.success) {
        message.success('Essay added successfully!');

        const sequenceResponse = await getQuestionSequence(Number(examId));
        const currentSequence = sequenceResponse.data.questionIds;
        const newQuestionId = response.data.id;
        const updatedSequence = [...currentSequence, newQuestionId];
        await updateQuestionSequence(Number(examId), updatedSequence);

        loadQuestions();
        form.resetFields();
      } else {
        message.error('Failed to add essay: ' + response.data.message);
      }
    } catch (error) {
      message.error('Failed to add essay. Please check your inputs.');
    }
  };

  return (
    <>
      <Form.Item name="questionType" hidden initialValue="ESSAY" />
      <Form.Item name="type" hidden initialValue="ESSAY" />

      <Collapse onChange={setActiveKey} activeKey={activeKey} style={{ marginBottom: 16 }}>
        <Collapse.Panel header="Generate Questions" key="1" style={{ border: 0, padding: 0 }}>
          <Form.Item
            label="Question Prompt"
            name="generatePrompt"
            rules={[{ required: true, message: 'Please enter a question prompt' }]}
          >
            <Input.TextArea placeholder="Enter a base idea for the questions" />
          </Form.Item>

          {/* <Form.Item
            label="Number of cover points per Question"
            name="numCoverPoints"
            rules={[{ required: true, message: 'Please specify the number of cover points' }]}
          >
            <Input type="number" min={2} max={10} />
          </Form.Item> */}

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

      <Form.Item
        label="Question"
        name="questionText"
        rules={[{ required: true, message: 'Missing Question' }]}
      >
        <Input.TextArea
          placeholder="Question"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
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
        <Form.List name={['coveringPoints']}>
          {(subFields, subOpt) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '100%' }}>
              {subFields.map((subField) => (
                <Flex key={subField.key} style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 8 }}>
                  <Form.Item
                    name={[subField.name, 'coveringPointText']}
                    rules={[{ required: true, message: 'Missing Covering Point' }]}
                    style={{ flex: 1, marginRight: 8, marginBottom: 0 }}
                  >
                    <Input.TextArea
                      placeholder="Covering Point"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      style={{ flex: 1 }}
                    />
                  </Form.Item>

                  <Form.Item
                    name={[subField.name, 'marks']}
                    rules={[{ required: true, message: 'Missing Marks' }]}
                    style={{ flex: 1, marginRight: 8, marginBottom: 0 }}
                  >
                    <Input placeholder="Marks" />
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
                Add Covering Point
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleAddEssay} block>
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