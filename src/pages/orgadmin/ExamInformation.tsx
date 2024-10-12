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
} from 'antd';
import { ExamRequestForm, ExamRequest } from '../../api/types';

type FieldType = {
    title?: string;
    description?: string;
    instructions?: string;
    duration?: number;
    examSetterId?: number;
    organizationId?: number;
    startDate?: string;
    endDate?: string;
};

const { RangePicker } = DatePicker;

const rangeConfig = {
    rules: [
        { type: 'array' as const, required: true, message: 'Please select time!' },
    ],
};

type ExamInformationProps = {
    onFinishFun: (values: ExamRequest) => void;
};

const ExamInformation: React.FC<ExamInformationProps> = ({ onFinishFun }) => {
    return (
        <Form name="basic" layout="vertical" onFinish={onFinishFun}>
            <Row gutter={[24, 0]}>
                <Col sm={24} lg={12}>
                    <Form.Item<FieldType>
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Input placeholder="Enter exam title" />
                    </Form.Item>
                </Col>

                <Col sm={24} lg={12}>
                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col sm={24} lg={12}>
                    <Form.Item<FieldType>
                        label="Duration"
                        name="duration"
                        rules={[{ required: true, message: 'Please input your duration!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col sm={24}>
                    <Form.Item
                        name="date"
                        label="Start Date & End Date"
                        {...rangeConfig}
                    >
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                </Col>

                <Col sm={24}>
                    <Form.Item name="instructions" label="Instructions">
                        <TextEditor />
                    </Form.Item>
                </Col>

                <Col sm={24} lg={24}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

// Export the component to be used in the main exam creation page
export default ExamInformation;
