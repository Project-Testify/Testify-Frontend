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
import { getLoggedInUser } from '../../utils/authUtils';
import { useEffect, useState } from 'react';

import { getExamInformation, saveExamInformation, updateExamInformation } from '../../api/services/ExamServices';
import moment from 'moment';

type ExamInformationProps = {
    onFinishFun: (values: ExamRequest) => void;
};

export const ExamInformation: React.FC<ExamInformationProps> = ({ }) => {
    const [form] = Form.useForm(); // Use Ant Design's form instance
    // const { getOrganization } = useAuth();
    const organizationId = Number(sessionStorage.getItem('orgId'));
    const user = getLoggedInUser();
    const examId = sessionStorage.getItem('examId'); // Retrieve the saved examId
    const [isUpdateMode, setIsUpdateMode] = useState(false); // Track if it's update mode
    const [loading, setLoading] = useState(false); // For loading state

    // Fetch exam data if examId exists in sessionStorage
    useEffect(() => {
        if (examId) {
            const fetchExamData = async () => {
                try {
                    const response = await getExamInformation(Number(examId)); // Call to backend to get exam details
                    if (response.status >= 200 && response.status < 300) {
                        const examData = response.data;
                        form.setFieldsValue({
                            title: examData.title,
                            description: examData.description,
                            duration: examData.duration,
                            date: [moment(examData.startDatetime), moment(examData.endDatetime)],
                            instructions: examData.instructions,
                        });
                        setIsUpdateMode(true); // Set update mode since data exists
                    } else {
                        message.error('Failed to load exam information.');
                    }
                } catch (error) {
                    console.error('Error fetching exam information:', error);
                }
            };

            fetchExamData();
        }
    }, [examId, form]);

    // Handle form submission (Save or Update)
    const handleFinish = async (values: any) => {
        try {
            const examRequest: ExamRequest = {
                title: values.title,
                description: values.description,
                instructions: values.instructions,
                duration: values.duration,
                organizationId: organizationId ?? 0,
                createdById: user?.id ?? 0,
                startDatetime: values.startDatetime.toISOString(),
                endDatetime: values.endDatetime.toISOString(),
                orderType: 'FIXED',
                isPrivate: false,
            };

            setLoading(true);

            if (isUpdateMode && examId) {
                // Call update API
                const response = await updateExamInformation(Number(examId), examRequest); // Assuming the update API is available
                if (response.data.success) {
                    message.success('Exam updated successfully.');
                } else {
                    message.error('Failed to update exam.');
                }
            } else {
                // Call save API
                const response = await saveExamInformation(examRequest);
                if (response.data.success) {
                    const newExamId = response.data.id;
                    sessionStorage.setItem('examId', newExamId); // Store the new exam ID
                    setIsUpdateMode(true); // Switch to update mode after save
                    message.success('Exam created successfully.');
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
    );

};

// Export the component to be used in the main exam creation page
export default ExamInformation;
