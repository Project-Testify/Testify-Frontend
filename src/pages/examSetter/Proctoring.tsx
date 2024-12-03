import { useState, useEffect } from "react";
import { Table, Button, List, Avatar, Modal, Tooltip, message, Input } from "antd";
import { VideoCameraOutlined, EyeOutlined, WarningOutlined, CommentOutlined } from "@ant-design/icons";
import { CandidateResponse, ExamResponse } from "../../api/types";
import { getProctoringCandidates, getProctoringExams, addProctorComment } from "../../api/services/ExamSetter";
import { getLoggedInUser } from "../../utils/authUtils";

export const Proctoring = () => {
  const [exams, setExams] = useState<ExamResponse[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamResponse | null>(null);
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<CandidateResponse | null>(null);
  const [comment, setComment] = useState("");
  const [isCandidateModalVisible, setIsCandidateModalVisible] = useState(false);
  const [candidateLoading, setCandidateLoading] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState<CandidateResponse | null>(null);

  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return null;
  }

  const proctorId = loggedInUser.id; 
  const organizationId = Number(sessionStorage.getItem("orgId")); 

  const fetchExams = async () => {
    try {
      const response = await getProctoringExams(proctorId, organizationId);
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleExamClick = async (exam: ExamResponse) => {
    setSelectedExam(exam);
    setCandidates(exam.candidates);
    setIsModalVisible(true);
  };

  const handleSendWarning = (candidate: CandidateResponse) => {
    Modal.success({
      title: "Warning Sent",
      content: `A warning has been sent to ${candidate.firstName}.`,
    });
  };

  const openCommentModal = (candidate: CandidateResponse) => {
    setCurrentCandidate(candidate);
    setComment("");
    setCommentModalVisible(true);
  };

  const handleSubmitComment = async () => {
    if (!currentCandidate || !selectedExam) {
      message.error("Candidate or Exam data is missing.");
      return;
    }

    try {
      await addProctorComment(currentCandidate.id, selectedExam.id, comment);
      message.success(`Comment added for ${currentCandidate.firstName}.`);
    } catch (error) {
      console.error("Error submitting comment:", error);
      message.error("Failed to submit comment.");
    } finally {
      setCommentModalVisible(false);
    }
  };

  const handleViewCandidate = (candidate: CandidateResponse) => {
    //setCandidateLoading(true);
    setCandidateDetails(candidate);
    setIsCandidateModalVisible(true);
  }
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: ExamResponse) => (
        <Button type="link" onClick={() => handleExamClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Zoom Link",
      dataIndex: "zoomLink",
      key: "zoomLink",
      render: (link: string) => (
        <Button
          type="link"
          icon={<VideoCameraOutlined />}
          href={link}
          target="_blank"
        >
          Join Zoom
        </Button>
      ),
    },
    {
      title: "Time",
      dataIndex: "startDatetime",
      key: "startDatetime",
    },
  ];

  return (
    <div>
      <h2>Assigned Exams</h2>
      <Table
        columns={columns}
        dataSource={exams}
        rowKey="id"
        pagination={false}
        loading={loading}
      />

      <Modal
        title={`Candidates for ${selectedExam?.title}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={candidates}
          renderItem={(candidate: CandidateResponse) => (
            <List.Item
              actions={[
                <Tooltip title="View Candidate" key="view">
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => handleViewCandidate(candidate)}
                  />
                </Tooltip>,
                // <Tooltip title="Send Warning" key="warning">
                //   <Button
                //     icon={<WarningOutlined />}
                //     danger
                //     onClick={() => handleSendWarning(candidate)}
                //   />
                // </Tooltip>,
                <Tooltip title="Add Comment" key="comment">
                  <Button
                    icon={<CommentOutlined />}
                    onClick={() => openCommentModal(candidate)}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                title={candidate.firstName}
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title={`Add Comment for ${currentCandidate?.firstName}`}
        visible={commentModalVisible}
        onCancel={() => setCommentModalVisible(false)}
        onOk={handleSubmitComment}
      >
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
        />
      </Modal>

      <Modal
        title={`Details for ${candidateDetails?.firstName || "Candidate"}`}
        visible={isCandidateModalVisible}
        onCancel={() => setIsCandidateModalVisible(false)}
        footer={null}
      >
        {candidateLoading ? (
          <p>Loading candidate details...</p>
        ) : candidateDetails ? (
          <div>
            <p><strong>Name:</strong> {candidateDetails.firstName} {candidateDetails.lastName}</p>
            <p><strong>Email:</strong> {candidateDetails.email}</p>
            
            {/* Add more fields as needed */}
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>

    </div>
  );
};
