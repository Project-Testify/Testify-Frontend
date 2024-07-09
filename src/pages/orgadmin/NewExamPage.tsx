import { PageHeader, Card, AddQuestion, QuestionsListCard, TextEditor} from '../../components';

import {
  BankOutlined,
  HomeOutlined,

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
  DatePicker,
  Space,

  Flex,
  Modal,
} from 'antd';
import { useState } from 'react';
import { useFetchData } from '../../hooks';


const { Step } = Steps;

type FieldType = {

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
  const [current, setCurrent] = useState(0);

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
            // remove the disalbed prop from current step
          }}
          current={current}
          labelPlacement="vertical"
          type="default"
        >
          <Step title="Exam Information" ></Step>
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

          {/* <Col sm={24} lg={12}>
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
          </Col> */}

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


          <Col sm={24}>
            <Form.Item
              name="instructions"
              label="Instructions"
            
            >
              <TextEditor/>
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


    const [open, setOpen] = useState(false);

    const showModal = () => {
      setOpen(true);
    };

    const {
      data: questionData = [],
      error: questionError,
      loading: questionLoading,
    } = useFetchData('../mocks/Questions.json');

    const handleOk = () => {

      form.validateFields().then(() => {
        // console.log(form.getFieldsValue());
        setOpen(false);

        // send to database http://localhost:8080/api/v1/exam/1/addQuestion
      });

    };

    const handleCancel = () => {
      setOpen(false);
      form.resetFields();
    };

    return (
      <>
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
              <Form form={form}>
                <AddQuestion
                //  handleOk={handleOk}
                  form={form} />

                {/* <Form.Item noStyle shouldUpdate>
                  {(form) => (
                    <Typography>
                      <pre>
                        {JSON.stringify(form.getFieldsValue(), null, 2)}
                      </pre>
                    </Typography>
                  )}
                </Form.Item> */}
              </Form>
            </Modal>
          </Space>
        </Flex>

        <Divider />        
          <QuestionsListCard
            data={questionData}
            error={questionError}
            loading={questionLoading}
          />
      </>

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
