import {
  PageHeader,
  Card,
  AddQuestion,
  QuestionsListCard,
  TextEditor,
} from '../../components';

import {
  BankOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import {
  Steps,
  Button,
  Divider,
  Row,
  Col,
  Input,
  DatePicker,
  Space,
  Flex,
  Modal,
  Typography,
  Tabs,
  Select,
  Table,
  Form,
  Upload,
  message,
  UploadFile,
  UploadProps,
} from 'antd';
import { SetStateAction, useContext, useState } from 'react';
import { useFetchData } from '../../hooks';

import { Candidate } from '../../types';
import { Switch } from 'antd';
import { uploadFiles } from '../../api/services/AIAssistant';

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

interface ExamInformationFormValues {
  title: string;
  description: string;
  instructions: string;
  duration: string; // Initially a string because it comes from the input field
  totalMarks: string; // Initially a string because it comes from the input field
  passMarks: string; // Initially a string because it comes from the input field
  organizationId?: string; // Optional field
  'range-time-picker'?: [moment.Moment, moment.Moment]; // Optional field
}

import { NewExamContext } from '../../context/NewExamContext';


import { createExam } from '../../api/services/exam';

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    { type: 'array' as const, required: true, message: 'Please select time!' },
  ],
};

export const NewExamPage = () => {
  const [current, setCurrent] = useState(0);

  const context = useContext(NewExamContext);

  if (!context) {
      throw new Error('ExamComponent must be used within a NewExamProvider');
  }

  const { newExamState } = context;

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
        title={newExamState.examName || 'New Exam'}
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
          onChange={(c: SetStateAction<number>) => {
            setCurrent(c);
            // remove the disalbed prop from current step
          }}
          current={current}
          labelPlacement="vertical"
          type="default"
        >
          <Step title="Exam Information"></Step>
          <Step title="Make Questions"></Step>
          <Step title="Grading and Proctoring"></Step>
          <Step title="Select Candidates"></Step>
          <Step title="Additional Features"></Step>
        </Steps>

        <Divider />

        {current === 0 && (
          <ExamInformation onFinishFun={onFinishExamInformation} />
        )}
        {current === 1 && <MakeQuestions />}
        {current === 2 && <GradingAndProctoring />}
        {current === 3 && <AddCandidate />}
        {current === 4 && <AdditionalFeatures />}

        <Divider />
      </Card>
    </div>
  );

  // exm infomartion
  function ExamInformation({ onFinishFun = () => {} }) {


    const submit = (values:ExamInformationFormValues) => {
      const formattedValues = {
        title: values.title,
        description: values.description,
        instructions: values.instructions,
        duration: parseInt(values.duration, 10),
        totalMarks: parseInt(values.totalMarks, 10),
        passMarks: parseInt(values.passMarks, 10),
        organizationId: values.organizationId ? parseInt(values.organizationId, 10) : 0,
        startDatetime: values['range-time-picker'] ? values['range-time-picker'][0].toISOString() : '',
        endDatetime: values['range-time-picker'] ? values['range-time-picker'][1].toISOString() : '',
        private: true
      };
      console.log(formattedValues);

      createExam(formattedValues).then((response) => {
        console.log('Exam created successfully:', response);
        message.success('Exam created successfully');
        onFinishFun();
      }).catch(error => {
        console.error('Failed to create exam:', error);
        message.error('Failed to create exam');
      });
      
    };
    



    return (
      <Form name="basic" layout="vertical" onFinish={submit}>
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

          {/* <Col sm={24} lg={12}>
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
          </Col> */}

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
            <Form.Item name="instructions" label="Instructions">
            <Form.Item
              name="instructions"
              valuePropName="value"
              getValueFromEvent={(e: any) => e}
              noStyle
            >
              <TextEditor />
              </Form.Item>
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

    const [contentModalOpen, setContentModalOpen] = useState(false);


    const showModal = () => {
      setOpen(true);
    };

    const showContentModal = () => {
      setContentModalOpen(true);
    }

    

    const handleOk = () => {
      form.validateFields().then(() => {
        // console.log(form.getFieldsValue());
        setOpen(false);

        // send to database http://localhost:8080/api/v1/exam/1/addQuestion
      });
    };

    const handleCancel = () => {
      setOpen(false);
      setContentModalOpen(false);
      form.resetFields();
    };


    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleFiles: UploadProps['onChange'] = (info) => {
      console.log(info); // Log the file information for debugging
      setFileList(info.fileList.filter(file => !!file.originFileObj));
    };
    
    const handleUpload = async () => {
      const files = fileList.map(file => file.originFileObj as File); // Type assertion as File
      const examId = 'example-exam-id'; // This should be dynamically fetched or set
      console.log('Uploading files:', files);
      if (files.length > 0) {
        uploadFiles(files, examId).then(response => {
          console.log('Files uploaded successfully:', response);
          setFileList([]); // Clear the file list after successful upload
          message.success('Files uploaded successfully');
          handleCancel();
        }).catch(error => {
          console.error('Failed to upload files:', error);
          message.error('Failed to upload files');
        });
      }
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
              <Button type="primary" onClick={showContentModal}>
                          Upload Content
            </Button>

            <Button type="primary" onClick={showModal}>
              Add Question
            </Button>

            {/* Upload Content Modal */}

            <Modal
    open={contentModalOpen}
    title="Upload Content"
    onOk={handleUpload}
    onCancel={handleCancel}
    footer={(_: any, { OkBtn, CancelBtn }: any) => (
      <>
        <CancelBtn  />
        <OkBtn />
      </>
    )}
  >
    <Form form={form}>
      <Form.Item name="upload" label="Upload">
        <Upload
          beforeUpload={() => false}
          onChange={handleFiles}
          fileList={fileList}
          multiple={true}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  </Modal>


{/* New Question Modal */}
            <Modal
              width={1100}
              open={open}
              title="Add Question"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={(_: any, { OkBtn, CancelBtn }: any) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              <Form form={form}>
                <AddQuestion
                  //  handleOk={handleOk}
                  form={form}
                />

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
        <QuestionsListCard />
      </>
    );
  }

  // add grading and proctoring
  function GradingAndProctoring() {
    const { data: gradingCriteriaData } = useFetchData(
      '../mocks/GradingCriteria.json'
    );
    const { data: proctorsData } = useFetchData('../mocks/ProctorsMock.json');

    const options = (proctorsData || []).map((proctor: any) => ({
      label: proctor.name,
      value: proctor.name,
    }));

    const onFinish = (values: any) => {
      console.log('Received values of form:', values);

      setCurrent(current + 1);
    };

    function standardGrading(criteria: any) {
      // console.log(criteria);
      return (
        <>
          {criteria.map((criterion: any) => (
            <Flex gap={12} key={criterion.id}>
              <Form.Item
                label={'Grade'}
                name={`grade`}
                initialValue={criterion.grade}
              >
                <Input disabled value={criterion.value} />
              </Form.Item>

              <Form.Item
                label={'Value'}
                name={`value`}
                initialValue={criterion.value}
              >
                <Input disabled value={criterion.value} />
              </Form.Item>
            </Flex>
          ))}
        </>
      );
    }

    function customGrading() {
      return (
        <>
          <Form.List name="gradingCriteria">
            {(fields: { [x: string]: any; key: any; name: any; }[], { add, remove }: any) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-around',
                      flex: 1,
                      gap: 20,
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'grade']}
                      rules={[
                        { required: true, message: 'Missing first name' },
                      ]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Grade" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ required: true, message: 'Missing last name' }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Mark" />
                    </Form.Item>
                    <CloseCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Grade
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      );
    }

    const handleTabChange = (key: any) => {
      form.resetFields();
      if (gradingCriteriaData?.[key - 1]) {
        console.log('key is ', key);
        form.setFieldsValue({
          gradingCriteria: gradingCriteriaData[key - 1].gradingCriteria,
        });
      }
    };

    const [form] = Form.useForm();
    return (
      <div>
        <Typography.Title level={3}>Add Grading</Typography.Title>
        <Divider />
        <Form name="dynamic_form_nest_item" onFinish={onFinish} form={form}>
          <Col sm={24} lg={24}>
            <Tabs
              tabPosition={'left'}
              onChange={handleTabChange}
              items={[
                ...(gradingCriteriaData || []).map(
                  (criteria: any, index: number) => ({
                    label: `Grading Criteria ${index + 1}`,
                    key: `${index + 1}`,
                    children: standardGrading(criteria.gradingCriteria),
                  })
                ),
                {
                  label: 'Customized',
                  key: `${(gradingCriteriaData || []).length + 1}`,
                  children: customGrading(),
                },
              ]}
            />
            <Divider />

            <Typography.Title level={3}>Add Proctors</Typography.Title>
            <Form.Item name="proctors" label="Proctors">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                options={options}
              />
            </Form.Item>
            <Divider />
            {/* <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item> */}
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  // add grading and proctoring
  function AddCandidate() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const { data: candidatesData } = useFetchData(
      '../mocks/CandidatesMock.json'
    );

    // useEffect(() => {
    //   if (candidatesData) {
    //     setCandidates(candidatesData);
    //   }
    // }, [candidatesData]);

    const options = (candidatesData || []).map((candidate: Candidate) => ({
      label: `${candidate.firstName} ${candidate.lastName}`,
      value: candidate.id,
    }));

    const uniqueGroups = new Set(
      (candidatesData || []).map((candidate: Candidate) => candidate.group)
    );

    const optionsGroup = Array.from(uniqueGroups).map((group) => ({
      label: group,
      value: group,
    }));

    const columns = [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
      },
    ];

    // when submit button is pressed
    const onFinish = () => {
      console.log(candidates);
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    const addValue = (value: any) => {
      console.log(value);
      const candidate = candidatesData.find(
        (candidate: Candidate) => candidate.id === value
      );
      if (!candidate || candidates.includes(candidate)) {
        return;
      }
      setCandidates([...candidates, candidate]);
    };

    const deleteSelected = () => {
      const newCandidatesData = candidates.filter((candidate) => {
        return !selectedRowKeys.includes(candidate.id);
      });
      setCandidates(newCandidatesData);
    };

    const addGroup = (value: any) => {
      const newCandidatesData = candidatesData.filter((candidate: Candidate) =>
        value.includes(candidate.group)
      );
      setCandidates(newCandidatesData);
    };

    const [form] = Form.useForm();


    return (
      <div>
        <Typography.Title level={3}>Add Candidates</Typography.Title>
        <Divider />
        <Form name="dynamic_form_nest_item" onFinish={onFinish} form={form}>
          <Col sm={24} lg={24}>
            <Flex justify="stretch" gap={10}>
              <Form.Item
                name="candidate"
                label="Search"
                style={{ width: '100%', flex: 1 }}
              >
                <Select
                  allowClear
                  placeholder="Search"
                  options={options}
                  onChange={addValue}
                />
              </Form.Item>

              <Form.Item
                name="candidateGroup"
                label="Search Group"
                style={{ width: '100%', flex: 1 }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Search Group"
                  options={optionsGroup}
                  onChange={addGroup}
                />
              </Form.Item>
            </Flex>
            <Divider />
          </Col>
          <Row>
            <Space direction='vertical'>

            <Col lg={24} style={{ flex: 1 }}>
              <Flex justify="end" align="end" gap={10} >
                <Button onClick={deleteSelected}>Delete</Button>
              </Flex>
            </Col>
            <Col lg={24}>
              <Table
                dataSource={candidates}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                rowSelection={rowSelection}
                scroll={{ y: 300 }}
              />
            </Col>
            </Space>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  function AdditionalFeatures() {
    const [form] = Form.useForm();

    // handleSubmission
    const handleSubmission = () => {
      console.log(form.getFieldsValue());
    };

    return (
      <>
        <Form form={form} onFinish={handleSubmission}>
          <Row>
            <Col sm={12} lg={12}>
              <Typography.Title level={5}>Feature 1</Typography.Title>
            </Col>
            <Col sm={12} lg={12}>
              <Form.Item name="feature1">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={12}>
              <Typography.Title level={5}>Feature 2</Typography.Title>
            </Col>
            <Col sm={12} lg={12}>
              <Form.Item name="feature2">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={12}>
              <Typography.Title level={5}>Feature 3</Typography.Title>
            </Col>
            <Col sm={12} lg={12}>
              <Form.Item name="feature3">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item> */}

          <Divider />
          {/* align button on the right side */}
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* // add submit button */}
      </>
    );
  }
};
