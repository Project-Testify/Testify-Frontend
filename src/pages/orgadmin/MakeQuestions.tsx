import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadFile, UploadProps, message, Space, Button, Modal, Upload, Divider, List, Card, Badge } from "antd";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { uploadFiles } from "../../api/services/AIAssistant";
import { AddQuestion } from "./AddQuestion";
import { useAuth } from "../../hooks/useAuth";
import { fetchQuestions, deleteQuestion } from "../../api/services/ExamServices";
import { Question } from "../../api/types";

const MakeQuestions = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { getOrganization } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const examId = sessionStorage.getItem('examId');

  const showModal = () => {
    setOpen(true);
  };

  const showContentModal = () => {
    setContentModalOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setContentModalOpen(false);
    form.resetFields();
  };

  const handleFiles: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList.filter(file => !!file.originFileObj));
  };

  const handleUpload = async () => {
    const files = fileList.map(file => file.originFileObj as File);
    const examId = 'example-exam-id'; // This should be dynamically fetched or set
    if (files.length > 0) {
      try {
        await uploadFiles(files, examId);
        message.success('Files uploaded successfully');
        setFileList([]);
        handleCancel();
      } catch (error) {
        console.error('Failed to upload files:', error);
        message.error('Failed to upload files');
      }
    }
  };

  const loadQuestions = async () => {
    const organizationId = getOrganization(); // Get the organization ID
    if (organizationId && examId) {
      try {
        const response = await fetchQuestions(Number(examId));
        const fetchedQuestions = response.data.questions || [];
        setQuestions(fetchedQuestions); // Update state with fetched questions
      } catch (error) {
        message.error('Failed to load questions');
      }
    } else {
      message.warning('No organization ID or exam ID found');
    }
  };

  // Call loadQuestions on component mount
  useEffect(() => {
    loadQuestions();
  }, [examId, getOrganization]);

  const handleEdit = (id: number) => {
    message.info(`Editing question ${id}`);
  };

  const handleDelete = (questionId: number) => {
    // Show confirmation modal before deleting
    Modal.confirm({
      title: 'Are you sure you want to delete this question?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // Call the backend API to delete the question
          deleteQuestion(questionId);

          // Show success message
          message.success('Question deleted successfully!');

          // Reload the questions after deletion
          loadQuestions();
        } catch (error) {
          // Handle any errors from the delete request
          console.error('Failed to delete question:', error);
          message.error('Failed to delete the question. Please try again.');
        }
      },
      onCancel() {
        console.log('Cancel deletion');
      }
    });
  };

  // MCQQuestion Component
  const MCQQuestion = ({ question }: { question: Question }) => {
    return (
      <Card
        style={{
          background: 'rgba(173, 216, 230, 0.2)', // Light blue glass effect
          backdropFilter: 'blur(10px)',
          marginBottom: '16px',
        }}

        title={question.questionText}
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(question.questionId)} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(question.questionId)} danger />
          </Space>
        }
      >
        <ul>
          {question.options?.map(option => (
            <li key={option.optionId} style={{ marginBottom: '8px' }}>
              {option.optionText}
              <Space style={{ marginLeft: '8px' }}>
                {option.correct ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
                <span>Marks: {option.marks}</span>
              </Space>
            </li>
          ))}
        </ul>
      </Card>
    );
  };

  // EssayQuestion Component
  const EssayQuestion = ({ question }: { question: Question }) => {
    return (
      <Card
        style={{
          background: 'rgba(173, 216, 230, 0.2)', // Light blue glass effect
          backdropFilter: 'blur(10px)',
          marginBottom: '16px',
        }}
        title={question.questionText}
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(question.questionId)} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(question.questionId)} danger />
          </Space>
        }
      >
        <ul>
          {question.coverPoints?.map(point => (
            <li key={point.coverPointId}>
              {point.coverPointText} - <span>Marks: {point.marks}</span>
            </li>
          ))}
        </ul>
      </Card>
    );
  };

  return (
    <>
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



        <Modal
          open={contentModalOpen}
          title="Upload Content"
          onOk={handleUpload}
          onCancel={handleCancel}
          footer={null}
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

        <Modal
          width={1100}
          open={open}
          title="Add Question"
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form}>
            <AddQuestion form={form} loadQuestions={loadQuestions} />
          </Form>
        </Modal>
      </Space>

      <Divider />

      <Space
        align="center"
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: '16px',
        }}
      >
        {/* Badge to display the number of questions */}
        <Badge
          count={questions.length}
          style={{
            backgroundColor: '#52c41a', // Green color for the badge
            borderRadius: '10px', // Rounded rectangle
            padding: '0 10px',
            color: '#fff',
            fontSize: '16px',
          }}
          showZero
        >
          <span
            style={{
              background: '#f5f5f5',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #d9d9d9',
            }}
          >
            Total Questions
          </span>
        </Badge>
      </Space>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={questions}
        renderItem={question => (
          <List.Item>
            {question.questionType === 'MCQ' ? (
              <MCQQuestion question={question} />
            ) : question.questionType === 'Essay' ? (
              <EssayQuestion question={question} />
            ) : null}
          </List.Item>
        )}
      />
    </>
  );
};

export default MakeQuestions;
