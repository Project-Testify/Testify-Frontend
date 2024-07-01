import { PageHeader, Card, QuestionCard, AddQuestion } from '../../components';

import {
  BankOutlined,
  CloseOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import {
  Steps,
  Button,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  DatePicker,
  Space,
  Typography,
  Flex,
  Modal,
} from 'antd';
import { useState } from 'react';
import { remove, values } from 'lodash';

const { Step } = Steps;

type FieldType = {
  // "title": "string",
  // "description": "string",
  // "instructions": "string",
  // "duration": 0,
  // "totalMarks": 0,
  // "passMarks": 0,
  // "examSetterId": 0,
  // "organizationId": 0

  title?: string;
  description?: string;
  instructions?: string;
  duration?: number;
  totalMarks?: number;
  passMarks?: number;
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

export const NewExamPage = () => {
  const [current, setCurrent] = useState(1);

  const onFinishExamInformation = () => {
    // setFormData(values)
    setCurrent(1);
  };

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'New exam'}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Exams</span>
              </>
            ),
          },
        ]}
      />

      <Card>
        <Steps
          onChange={(c) => {
            setCurrent(c);
          }}
          current={current}
          labelPlacement="vertical"
          type="default"
        >
          <Step title="Exam Information"></Step>
          <Step title="Make Questions"></Step>
          <Step title="Add Setter"></Step>
        </Steps>

        <Divider />

        {current === 0 && (
          <ExamInformation onFinishFun={onFinishExamInformation} />
        )}
        {current === 1 && <MakeQuestions />}
        {current === 2 && <AddSetter />}

        <Divider />
      </Card>
    </div>
  );

  // exm infomartion
  function ExamInformation({ onFinishFun = () => {} }) {
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
              rules={[
                { required: true, message: 'Please input your description!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Instructions"
              name="instructions"
              rules={[
                {
                  required: true,
                  message: 'Please input your instructions!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Duration"
              name="duration"
              rules={[
                { required: true, message: 'Please input your duration!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Total Marks"
              name="totalMarks"
              rules={[
                { required: true, message: 'Please input your total marks!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Pass Marks"
              name="passMarks"
              rules={[
                { required: true, message: 'Please input your pass marks!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Exam Setter"
              name="examSetterId"
              rules={[
                { required: true, message: 'Please input your exam setter!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Organization"
              name="organizationId"
              rules={[
                {
                  required: true,
                  message: 'Please input your organization!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="range-time-picker"
              label="Start Date & End Date"
              {...rangeConfig}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
  }

  // make questions
  function MakeQuestions() {
    const [form] = Form.useForm();

    function addQuestion() {
      form.setFieldsValue({
        items: [...values(form.getFieldsValue().items), {}],
      });
    }

    const [open, setOpen] = useState(false);

    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      setOpen(false);
    };

    const handleCancel = () => {
      setOpen(false);
    };

    function makePopup() {
      return (
        <Modal
          open={open}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button>Custom Button</Button>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      );
    }

    return (
      <Flex vertical gap={12}>
        <Space
          align="end"
          style={{
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Button type="primary" onClick={showModal}>
            Add Question
          </Button>

          <Modal
            open={open}
            title="Add Question"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            <Form.Item>
             <AddQuestion />
            </Form.Item>
          </Modal>
        </Space>

        <Form
          form={form}
          name="dynamic_form_complex"
          autoComplete="off"
          initialValues={{ items: [{}] }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
              >
                {fields.map((field) => (
                  <QuestionCard fieldName={field} form={form} remove={remove} />
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  + Add Question
                </Button>
              </div>
            )}
          </Form.List>

          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
      </Flex>
    );
  }

  // add setter
  function AddSetter() {
    return (
      <div>
        <h1>Add Setter</h1>
      </div>
    );
  }
};
