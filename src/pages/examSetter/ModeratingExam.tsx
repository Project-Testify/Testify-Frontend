import React, { useEffect, useState } from "react";
import { Card, Input, Button, Space, Divider, Badge, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchQuestions, updateQuestionComment } from "../../api/services/ExamServices";
import { Question } from "../../api/types";

export const ModeratingExam: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch exam ID from session storage
  const examId = sessionStorage.getItem("moderateExam");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        if (examId) {
          const response = await fetchQuestions(Number(examId));
          setQuestions(response.data.questions);
        } else {
          message.error("Exam ID not found in session storage");
        }
      } catch (error) {
        message.error("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [examId]);

  // MCQ Question Component
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

  // Essay Question Component
  const EssayQuestion = ({ question }: { question: Question }) => {
    const [comment, setComment] = useState<string>(question.comment || "");
    const [commentLoading, setCommentLoading] = useState<boolean>(false);

    const handleCommentUpdate = async () => {
      try {
        setCommentLoading(true);
        const response = await updateQuestionComment({
          questionId: question.questionId,
          comment,
        });
        message.success(response.data.message);
      } catch {
        message.error("Failed to update comment");
      } finally {
        setCommentLoading(false);
      }
    };

    return (
      <Card title={question.questionText} style={{ marginBottom: 16 }}>
        <ul>
          {question.coverPoints?.map((point) => (
            <li key={point.coverPointId}>
              {point.coverPointText} - <span>Marks: {point.marks}</span>
            </li>
          ))}
        </ul>
        <Space>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleCommentUpdate} loading={commentLoading}>
            Add Comment
          </Button>
        </Space>
      </Card>
    );
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Badge count={questions.length} showZero>
          <span>Total Questions</span>
        </Badge>
      </Space>
      <Divider />
      {loading ? (
        <p>Loading...</p>
      ) : (
        questions.map((question) =>
          question.questionType === "MCQ" ? (
            <MCQQuestion key={question.questionId} question={question} />
          ) : question.questionType === "Essay" ? (
            <EssayQuestion key={question.questionId} question={question} />
          ) : null
        )
      )}
    </div>
  );
};
