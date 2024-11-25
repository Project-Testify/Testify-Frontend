import { useState, useEffect } from "react";
import { Table, Button, List, Avatar, Modal, Tooltip } from "antd";
import { VideoCameraOutlined, EyeOutlined, WarningOutlined } from "@ant-design/icons";

interface Candidate {
  id: number;
  name: string;
  avatar: string;
  status: string;
}

interface Exam {
  id: number;
  name: string;
  zoomLink: string;
  time: string;
}

export const Proctoring = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch exams assigned to the proctor
    const fetchExams = async () => {
      const data: Exam[] = [
        { id: 1, name: "Math Exam", zoomLink: "https://zoom.us/j/123456789", time: "10:00 AM" },
        { id: 2, name: "Physics Exam", zoomLink: "https://zoom.us/j/987654321", time: "1:00 PM" },
      ];
      setExams(data);
    };
    fetchExams();
  }, []);

  const handleExamClick = async (exam: Exam) => {
    setSelectedExam(exam);
    // Fetch candidates assigned to the selected exam
    const data: Candidate[] = [
      { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg", status: "active" },
      { id: 2, name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg", status: "suspicious" },
    ];
    setCandidates(data);
    setIsModalVisible(true);
  };

  const handleSendWarning = (candidate: Candidate) => {
    Modal.success({
      title: "Warning Sent",
      content: `A warning has been sent to ${candidate.name}.`,
    });
  };

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Exam) => (
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
        title={`Candidates for ${selectedExam?.name}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={candidates}
          renderItem={(candidate: Candidate) => (
            <List.Item
              actions={[
                <Tooltip title="View Candidate">
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => console.log("Viewing candidate:", candidate)}
                  />
                </Tooltip>,
                <Tooltip title="Send Warning">
                  <Button
                    icon={<WarningOutlined />}
                    danger
                    onClick={() => handleSendWarning(candidate)}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={candidate.avatar} />}
                title={candidate.name}
                description={`Status: ${candidate.status}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
