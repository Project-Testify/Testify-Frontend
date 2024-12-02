import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadFile, UploadProps, message, Space, Button, Modal, Upload, Divider, List, Card, Badge, Input } from "antd";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { uploadFiles } from "../../api/services/AIAssistant";
import { AddQuestion } from "./AddQuestion";
import { useAuth } from "../../hooks/useAuth";
import { fetchQuestions, deleteQuestion, getQuestionSequence, updateQuestionSequence, updateQuestionComment } from "../../api/services/ExamServices";
import { Question } from "../../api/types";
import MCQUpdate from "./MCQUpdate";
import EssayUpdate from "./EssayUpdate";
import { Reorder } from "framer-motion"

const MakeQuestions = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { getOrganization } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const examId = sessionStorage.getItem('examId');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setEditModalOpen(true);
  };
  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditingQuestion(null); // Clear the question being edited
  };

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
    if (!examId) return;

    try {
      // Fetch the questions for the exam
      const response = await fetchQuestions(Number(examId));
      console.log('Fetched questions:', response);
      const fetchedQuestions = response.data.questions || [];

      // If no questions are fetched, set questions to an empty array
      if (fetchedQuestions.length === 0) {
        setQuestions([]);
        return;
      }

      // Fetch the correct question sequence using getQuestionSequence
      const sequenceResponse = await getQuestionSequence(Number(examId));
      const correctSequence = sequenceResponse.data.questionIds || [];

      // Reorder the fetchedQuestions based on the correct sequence
      const orderedQuestions = correctSequence.map((id) =>
        fetchedQuestions.find((q) => q.questionId === id)
      );

      // Set the reordered questions to the state
      setQuestions(orderedQuestions.filter((q): q is Question => q !== undefined));
    } catch (error) {
      message.error('Failed to load questions or sequence');
    }
  };


  // Call loadQuestions on component mount
  useEffect(() => {
    loadQuestions();
  }, [examId, getOrganization]);


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

          await deleteQuestion(questionId);

          message.success('Question deleted successfully!');

          const sequenceResponse = await getQuestionSequence(Number(examId));
          const currentSequence = sequenceResponse.data.questionIds;
          const updatedSequence = currentSequence.filter(id => id !== questionId);
          await updateQuestionSequence(Number(examId), updatedSequence);

          await loadQuestions();
        } catch (error) {
          console.error('Failed to delete question:', error);
          message.error('Failed to delete the question. Please try again.');
        }
      },
      onCancel() {
        console.log('Cancel deletion');
      }
    });
  };

  const handleReorder = async (newOrder: Question[]) => {
    // Extract question IDs from the reordered list
    const updatedSequence = newOrder.map((question) => question.questionId);

    try {
      // Assuming you have an `examId` variable available in your component
      await updateQuestionSequence(Number(examId), updatedSequence);
      console.log('Question sequence updated successfully!');
    } catch (error) {
      console.error('Error updating question sequence:', error);
    }
  };

  // MCQQuestion Component
  const MCQQuestion = ({ question }: { question: Question }) => {
    const [comment, setComment] = useState<string>(question.comment || ""); // Initialize with existing comment or empty
    const [loading, setLoading] = useState<boolean>(false); // Loading state for API call

    const handleCommentUpdate = async () => {
      try {
        setLoading(true);
        const response = await updateQuestionComment({
          questionId: question.questionId,
          comment,
        });
        message.success(response.data.message);
      } catch (error) {
        message.error(
          "Failed to update the comment"
        );
      } finally {
        setLoading(false);
      }
    };

    const handleClearComment = () => {
      setComment(""); 
      handleCommentUpdate(); 
    };


    return (
      <Card
        style={{
          background: "rgba(39, 174, 96, 0.2)", // Light blue glass effect
          backdropFilter: "blur(10px)",
          marginBottom: "16px",
        }}
        title={question.questionText}
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(question)} />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(question.questionId)}
              danger
            />
          </Space>
          
        }
      >
        <ul>
          {question.options?.map((option) => (
            <li key={option.optionId} style={{ marginBottom: "8px" }}>
              {option.optionText}
              <Space style={{ marginLeft: "8px" }}>
                {option.correct ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
                <span>Marks: {option.marks}</span>
              </Space>
            </li>
          ))}
        </ul>

        {/* Comment Input Section */}
        <Space style={{ marginTop: "16px" }}>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            style={{ width: "300px" }}
          />
          <Button
            type="primary"
            onClick={handleCommentUpdate}
            loading={loading}
          >
            Add Comment
          </Button>

          <Button
            onClick={handleClearComment}  // Call with null to clear the comment
            loading={loading}
            danger
          >
            Clear Comment
          </Button>
        </Space>
      </Card>
    );
  };

  // EssayQuestion Component
  const EssayQuestion = ({ question }: { question: Question }) => {
    const [comment, setComment] = useState<string>(question.comment || ""); // Initialize with existing comment or empty
    const [loading, setLoading] = useState<boolean>(false); // Loading state for API call

    const handleCommentUpdate = async () => {
      try {
        setLoading(true);
        const response = await updateQuestionComment({
          questionId: question.questionId,
          comment,
        });
        message.success(response.data.message);
      } catch (error) {
        message.error(
          "Failed to update the comment"
        );
      } finally {
        setLoading(false);
      }
    };

    const handleClearComment = () => {
      setComment(""); 
      handleCommentUpdate(); 
    };

    return (
      <Card
        style={{
          background: 'rgba(41, 128, 185, 0.2)', // Light blue glass effectrgb(41, 128, 185)rgb(39, 174, 96)
          backdropFilter: 'blur(10px)',
          marginBottom: '16px',
        }}
        title={question.questionText}
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(question)} />
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

        {/* Comment Input Section */}
        <Space style={{ marginTop: "16px" }}>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            style={{ width: "300px" }}
          />
          <Button
            type="primary"
            onClick={handleCommentUpdate}
            loading={loading}
          >
            Add Comment
          </Button>

          <Button
            onClick={handleClearComment}  // Call with null to clear the comment
            loading={loading}
            danger
          >
            Clear Comment
          </Button>
        </Space>
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
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleUpload}>
              Submit
            </Button>,
          ]}
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

      <Reorder.Group
        values={questions}
        onReorder={(newOrder) => {
          setQuestions(newOrder); // Update the state with the new order
          handleReorder(newOrder); // Call the function to update the question sequence
        }}
        style={{ listStyleType: 'none' }} // Remove default list styling (dot)
      >
        {questions.map((question, index) => (
          <Reorder.Item key={question.questionId} value={question} style={{ marginBottom: '40px' }}>
            <List.Item>
              {/* Display "Question 01", "Question 02", etc. */}
              <div >
                Question {String(index + 1).padStart(2, '0')}
              </div>
              {question.questionType === 'MCQ' ? (
                <MCQQuestion question={question} />
              ) : question.questionType === 'Essay' ? (
                <EssayQuestion question={question} />
              ) : null}
            </List.Item>
          </Reorder.Item>
        ))}
      </Reorder.Group>


      {/* Edit modal */}
      <Modal
        title="Edit Question"
        open={editModalOpen}
        onCancel={handleCancelEdit}  // Close modal on cancel
        footer={null}
      >
        {editingQuestion && editingQuestion.questionType === 'MCQ' ? (
          <MCQUpdate question={editingQuestion} handleCancelEdit={handleCancelEdit} loadQuestions={loadQuestions} />
        ) : editingQuestion && editingQuestion.questionType === 'Essay' ? (
          <EssayUpdate question={editingQuestion} handleCancelEdit={handleCancelEdit} loadQuestions={loadQuestions} />
        ) : null}
      </Modal>
    </>
  );
};

export default MakeQuestions;
