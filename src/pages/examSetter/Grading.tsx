import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, List, Avatar, Tooltip } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
// Define interfaces for data types
interface Candidate {
  id: number;
  name: string;
  avatar: string;
  graded: boolean;
}

interface Exam {
  id: number;
  name: string;
  status: string;
}

export const GradingSection: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams assigned to the setter
    const fetchExams = async () => {
      const data: Exam[] = [
        { id: 1, name: "Math Exam", status: "fully graded" },
        { id: 2, name: "History Exam", status: "not graded" },
        { id: 3, name: "Chemistry Exam", status: "fully graded" },
      ];
      setExams(data);
    };
    fetchExams();
  }, []);

  const handleExamClick = async (exam: Exam) => {
    setSelectedExam(exam);
    // Fetch candidates who completed the selected exam
    const data: Candidate[] = [
      { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg", graded: false },
      { id: 2, name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg", graded: true },
    ];
    setCandidates(data);
    setIsModalVisible(true);
  };

  const handleGradeCandidate = (candidate: Candidate) => {
    // Placeholder for grading logic

    // Modal.success({
    //   title: "Grading Complete",
    //   content: `You have graded ${candidate.name}.`,
    // });


    navigate('/examSetter/exam/grading');

    // Update candidate graded status in UI
    setCandidates((prevCandidates) =>
      prevCandidates.map((c) => (c.id === candidate.id ? { ...c, graded: true } : c))
    );
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
      title: "Grading Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "fully graded"
            ? "green"
            : status === "partially graded"
            ? "orange"
            : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div>
      <h2>Grading Dashboard</h2>
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
                candidate.graded ? (
                  <Tooltip title="Already Graded">
                    <Button icon={<CheckOutlined />} type="primary" disabled>
                      Graded
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Grade Candidate">
                    <Button
                      icon={<EditOutlined />}
                      type="primary"
                      onClick={() => handleGradeCandidate(candidate)}
                    >
                      Grade
                    </Button>
                  </Tooltip>
                ),
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={candidate.avatar} />}
                title={candidate.name}
                description={candidate.graded ? "Graded" : "Not Graded"}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};
