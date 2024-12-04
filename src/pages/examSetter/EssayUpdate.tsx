import React, { useEffect } from 'react';
import { Form, Button, Input, Radio,message } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { updateEssayQuestion } from '../../api/services/ExamServices'; // Adjust the import path for your API functions
import { Question } from '../../api/types';
import { EssayUpdateRequest } from '../../api/examServiceTypes';

interface EssayUpdateProps {
    question: Question; // The essay question data to be updated
    loadQuestions: () => void; // Function to load questions after update
    handleCancelEdit: () => void; // Function to cancel editing
}

const EssayUpdate: React.FC<EssayUpdateProps> = ({ question, loadQuestions, handleCancelEdit }) => {
    const [form] = Form.useForm();
    const { TextArea } = Input;

    // Populate the form with existing question data when the component mounts
    useEffect(() => {
        form.setFieldsValue({
            questionType: 'ESSAY',
            type: 'ESSAY',
            questionText: question.questionText,
            questionDifficulty: question.difficultyLevel,
            coveringPoints: (question.coverPoints ?? []).map((point) => ({
                coveringPointText: point.coverPointText,
                marks: point.marks,
            })),
        });
    }, [form, question]);

    // Define the handleUpdateEssay function
    const handleUpdateEssay = async () => {

        try {
            const values = await form.validateFields();

            const examId = sessionStorage.getItem('examId');
            if (!examId) {
                message.error('Exam ID is missing. Please select or create an exam.');
                return;
            }

            // Build the essay request object for update
            const essayRequest: EssayUpdateRequest = {
                id: question.questionId, // Assuming question has an id property
                questionText: values.questionText,
                difficultyLevel: values.questionDifficulty || 'EASY',
                coveringPoints: values.coveringPoints.map((point: { coveringPointText: string; marks: number }) => ({
                    coverPointText: point.coveringPointText,
                    marks: point.marks,
                })),
            };

            console.log('Updating Essay Data:', essayRequest);

            const response = await updateEssayQuestion(Number(examId), essayRequest); // Call the update API
            if (response.data.success) {
                message.success('Essay updated successfully!');
                loadQuestions();
                handleCancelEdit();
            } else {
                message.error('Failed to update essay: ' + response.data.message);
            }
        } catch (error) {
            message.error('Failed to update essay. Please check your inputs.');
        }
    };

    return (
        <>
            <Form form={form} layout="vertical">
                <Form.Item name="questionType" hidden initialValue="ESSAY" />
                <Form.Item name="type" hidden initialValue="ESSAY" />

                <Form.Item
                    label="Question"
                    name="questionText"
                    rules={[{ required: true, message: 'Missing Question' }]}
                >
                    <TextArea
                        placeholder="Question"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </Form.Item>

                <Form.Item
                    label="Difficulty"
                    name="questionDifficulty"
                    rules={[{ required: true, message: 'Missing Difficulty' }]}
                    initialValue={question.difficultyLevel || 'EASY'}
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
                                    <div key={subField.key} style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 8 }}>
                                        <Form.Item
                                            name={[subField.name, 'coveringPointText']}
                                            rules={[{ required: true, message: 'Missing Covering Point' }]}
                                            style={{ flex: 1, marginRight: 8, marginBottom: 0 }}
                                        >
                                            <TextArea
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
                                            icon={<CloseOutlined />}
                                        />
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => subOpt.add()} block icon={<PlusOutlined />}>
                                    Add Covering Point
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleUpdateEssay} block>
                        Update Essay
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="default" onClick={handleCancelEdit} block>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EssayUpdate;
