import React from 'react';
import { Form, Button, Input, Radio, Collapse, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { updateMCQQuestion } from '../../api/services/ExamServices'; // Adjust the import path for your update function
import { Question } from '../../api/types';
import { MCQUpdateRequest } from '../../api/examServiceTypes';

interface MCQUpdateProps {
    question: Question; 
    handleCancelEdit: () => void; 
    loadQuestions: () => void; 
}

const MCQUpdate: React.FC<MCQUpdateProps> = ({ question, handleCancelEdit, loadQuestions }) => {
    const [form] = Form.useForm();
    const { TextArea } = Input;

    // Load existing question data into the form fields
    React.useEffect(() => {
        form.setFieldsValue({
            questionText: question.questionText,
            difficulty: question.difficultyLevel,
            options: (question.options ?? []).map((option) => ({
                optionText: option.optionText,
                marks: option.marks,
                correct: option.correct,
            })),
        });
    }, [form, question]);

    const handleUpdateMCQ = async () => {
        const examId = sessionStorage.getItem('examId');
        if (!examId) {
            message.error('Exam ID is missing. Please select or create an exam.');
            return;
        }
        try {
            const values = await form.validateFields();
            const mcqUpdateRequest: MCQUpdateRequest = {
                id: question.questionId, // Assuming question has an id property
                questionText: values.questionText,
                difficultyLevel: values.difficulty,
                options: values.options.map((option: { optionText: any; marks: any; correct: any; }) => ({
                    optionText: option.optionText,
                    marks: option.marks,
                    correct: option.correct,
                }))
            };

            const response = await updateMCQQuestion(Number(examId), mcqUpdateRequest); // Call the update API
            if (response.data.success) {
                message.success('MCQ updated successfully!');
                loadQuestions();
                handleCancelEdit(); 
            } else {
                message.error('Failed to update MCQ: ' + response.data.message);
            }
        } catch (error) {
            message.error('Failed to update question. Please check your inputs.');
        }
    };

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label="Question"
                name="questionText"
                rules={[{ required: true }]}
            >
                <TextArea
                    placeholder="Enter question text"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </Form.Item>

            <Form.Item
                label="Difficulty"
                name="difficulty"
                rules={[{ required: true, message: 'Please select difficulty' }]}
                initialValue="EASY"
            >
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="EASY">Easy</Radio.Button>
                    <Radio.Button value="MEDIUM">Medium</Radio.Button>
                    <Radio.Button value="HARD">Hard</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Answers">
                <Form.List name="options">
                    {(subFields, { add, remove }) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                                <div key={subField.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                                    <Form.Item
                                        name={[subField.name, 'optionText']}
                                        rules={[{ required: true, message: 'Missing Answer' }]}
                                        style={{ flex: 1, marginRight: 8, marginBottom: 0 }}
                                    >
                                        <TextArea
                                            placeholder="Answer"
                                            autoSize={{ minRows: 1, maxRows: 6 }}
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
                                        rules={[{ required: true, message: 'Select if correct or wrong' }]}
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
                                        onClick={() => remove(subField.name)}
                                        style={{ marginLeft: 'auto', color: 'red', border: 'none', padding: 0 }}
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
                <Button type="primary" onClick={handleUpdateMCQ} block>
                    Update Question
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" onClick={handleCancelEdit} block>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MCQUpdate;
