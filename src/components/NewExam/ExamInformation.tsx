import { Col, Row, Form, Input, DatePicker, Button } from 'antd';
import { TextEditor } from '../../components';

const { RangePicker } = DatePicker;

type ExamRequestForm = {
  title?: string;
  description?: string;
  instructions?: string;
  duration?: number;
  totalMarks?: number;
  passMarks?: number;
  date?: any[];
};

const rangeConfig = {
  rules: [
    { type: 'array' as const, required: true, message: 'Please select time!' },
  ],
};

export const ExamInformation = ({ onFinishFun }: { onFinishFun: (values: ExamRequestForm) => void }) => {
  return (
    <Form name="basic" layout="vertical" onFinish={onFinishFun}>
      <Row gutter={[24, 0]}>
        <Col sm={24} lg={12}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
            <Input placeholder="Enter exam title" />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Duration" name="duration" rules={[{ required: true, message: 'Please input your duration!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Total Marks" name="totalMarks" rules={[{ required: true, message: 'Please input your total marks!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Pass Marks" name="passMarks" rules={[{ required: true, message: 'Please input your pass marks!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24}>
          <Form.Item name="date" label="Start Date & End Date" {...rangeConfig}>
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
