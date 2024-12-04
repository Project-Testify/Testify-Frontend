import {
    TextEditor,
} from '../../components';

import {
    Button,
    Row,
    Col,
    Input,
    DatePicker,
    Form,
    message,
    InputNumber,
} from 'antd';
import { ExamRequest } from '../../api/types';
import { useAuth } from '../../hooks/useAuth';
import { getLoggedInUser } from '../../utils/authUtils';
import { useEffect, useState } from 'react';

import { getExamInformation, saveExamInformation, updateExamInformation, getConflictingExams } from '../../api/services/ExamServices';
import { ConflictExamResponse } from '../../api/examServiceTypes';

import moment from 'moment';

type ExamInformationProps = {
    onFinishFun: (values: ExamRequest) => void;
};

const ExamInformation: React.FC<ExamInformationProps> = ({ }) => {
    const [form] = Form.useForm();
    const { getOrganization } = useAuth();
    const organizationId = getOrganization();
    const user = getLoggedInUser();
    const examId = sessionStorage.getItem('examId');
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conflictingExams, setConflictingExams] = useState<ConflictExamResponse[]>([]);

    useEffect(() => {
        if (examId) {
            const fetchExamData = async () => {
                try {
                    const response = await getExamInformation(Number(examId));
                    if (response.status >= 200 && response.status < 300) {
                        const examData = response.data;
                        form.setFieldsValue({
                            title: examData.title,
                            description: examData.description,
                            duration: examData.duration,
                            startDatetime: moment(examData.startDatetime),
                            endDatetime: moment(examData.endDatetime),
                            instructions: examData.instructions,
                        });
                        setIsUpdateMode(true);
                    } else {
                        message.error('Failed to load exam information.');
                    }
                } catch (error) {
                    console.error('Error fetching exam information:', error);
                }
            };

            fetchExamData();
            fetchConflictingExams(Number(examId));
        }
    }, [examId, form]);

    const fetchConflictingExams = async (examId: number) => {
        try {
            const response = await getConflictingExams(examId);
            if (response.status >= 200 && response.status < 300) {
                setConflictingExams(response.data);
                if (response.data.length > 0) {
                    message.warning('There are conflicting exams scheduled. Please review.');
                }
            } else {
                message.error('Failed to fetch conflicting exams.');
            }
        } catch (error) {
            console.error('Error fetching conflicting exams:', error);
            message.error('An error occurred while checking for conflicting exams.');
        }
    };

    const handleFinish = async (values: any) => {
        try {
            const examRequest: ExamRequest = {
                title: values.title,
                description: values.description,
                instructions: values.instructions,
                duration: values.duration,
                organizationId: organizationId ?? 0,
                createdById: user?.id ?? 0,
                startDatetime: values.startDatetime.format('YYYY-MM-DDTHH:mm:ss'),
                endDatetime: values.endDatetime.format('YYYY-MM-DDTHH:mm:ss'),
                orderType: 'FIXED',
                isPrivate: false,
            };

            setLoading(true);

            if (isUpdateMode && examId) {
                const response = await updateExamInformation(Number(examId), examRequest);
                if (response.data.success) {
                    message.success('Exam updated successfully.');
                    await fetchConflictingExams(Number(examId));
                } else {
                    message.error('Failed to update exam.');
                }
            } else {
                const response = await saveExamInformation(examRequest);
                if (response.data.success) {
                    const newExamId = response.data.id;
                    sessionStorage.setItem('examId', newExamId);
                    setIsUpdateMode(true);
                    message.success('Exam created successfully.');
                    await fetchConflictingExams(newExamId);
                } else {
                    message.error('Failed to save exam.');
                }
            }
        } catch (error) {
            console.error('Error saving exam information:', error);
            message.error('An error occurred while saving exam information.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {conflictingExams.length > 0 && (
                <div
                    style={{
                        marginTop: '16px',
                        padding: '16px',
                        border: '1px solid red',
                        borderRadius: '4px',
                        backgroundColor: '#f8d7da', // Light red background color
                        color: '#721c24', // Dark red text color for contrast
                    }}
                >
                    <h4>Conflicting Exams:</h4>
                    <ul>
                        {conflictingExams.map((exam) => (
                            <li key={exam.id}>
                                <strong>{exam.title}</strong>: {moment(exam.startDatetime).format('YYYY-MM-DD HH:mm')} - {moment(exam.endDatetime).format('YYYY-MM-DD HH:mm')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Form form={form} name="examForm" layout="vertical" onFinish={handleFinish}>
                <Row gutter={[24, 0]}>
                    {/* Title in a single row */}
                    <Col sm={24}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input placeholder="Enter exam title" />
                        </Form.Item>
                    </Col>

                    {/* Description and Duration in the same row */}
                    <Col sm={18}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col sm={6}>
                        <Form.Item
                            label="Duration"
                            name="duration"
                            rules={[{ required: true, message: 'Please input the duration!' }]}
                        >
                            <InputNumber min={1} placeholder="Duration in minutes" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    {/* Date inputs (Start Date and End Date) in the same row */}
                    <Col sm={12}>
                        <Form.Item
                            label="Start Date & Time"
                            name="startDatetime"
                            rules={[{ required: true, message: 'Please select the start date and time!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                    </Col>

                    <Col sm={12}>
                        <Form.Item
                            label="End Date & Time"
                            name="endDatetime"
                            rules={[{ required: true, message: 'Please select the end date and time!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                    </Col>

                    {/* Instructions */}
                    <Col sm={24}>
                        <Form.Item name="instructions" label="Instructions">
                            <TextEditor />
                        </Form.Item>
                    </Col>

                    {/* Submit Button */}
                    <Col sm={24} lg={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {isUpdateMode ? 'Update Exam' : 'Save Exam'}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

// Export the component to be used in the main exam creation page
export default ExamInformation;
