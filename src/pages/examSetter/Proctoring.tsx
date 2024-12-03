import { useState, useEffect } from "react";
import { Table, Button, List, Avatar, Modal, Tooltip, message } from "antd";
import { VideoCameraOutlined, EyeOutlined, WarningOutlined } from "@ant-design/icons";
import { CandidateResponse, ExamResponse } from "../../api/types";
import { getProctoringCandidates, getProctoringExams } from "../../api/services/ExamSetter";
import { getLoggedInUser } from "../../utils/authUtils";

export const Proctoring = () => {
  const [exams, setExams] = useState<ExamResponse[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamResponse | null>(null);
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return;
  }
  
  const proctorId = loggedInUser.id; 
  const organizationId = Number(sessionStorage.getItem("orgId")); 

  const fetchExams = async () => {
    try {
      const response = await getProctoringExams(proctorId, organizationId);
      console.log('Fetched exams:', response.data);
      setExams(response.data);
      console.log('exams',exams);
      
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
    try {
      const response = await getProctoringCandidates(exam.id);
      setCandidates(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleSendWarning = (candidate: CandidateResponse) => {
    Modal.success({
      title: "Warning Sent",
      content: `A warning has been sent to ${candidate.firstName}.`,
    });
  };

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
      key: "name",
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
      dataIndex: "time",
      key: "time",
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
                    onClick={() => console.log("Viewing candidate:", candidate)}
                  />
                </Tooltip>,
                <Tooltip title="Send Warning" key="warning">
                  <Button
                    icon={<WarningOutlined />}
                    danger
                    onClick={() => handleSendWarning(candidate)}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                // avatar={<Avatar src={candidate.avatar} />}
                title={candidate.firstName}
                // description={`Status: ${candidate.status}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
