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

    // Assuming an API response where candidate data is based on exam id
    const examCandidates: { [key: number]: Candidate[] } = {
      1: [
        { id: 1, name: "Tharindra Fernando", avatar: "https://randomuser.me/api/portraits/men/1.jpg", graded: true },
        { id: 2, name: "Kaumadi Pahalage", avatar: "https://randomuser.me/api/portraits/women/2.jpg", graded: true },
        { id: 3, name: "Roshan Silva", avatar: "https://randomuser.me/api/portraits/men/3.jpg", graded: true },
      ],
      2: [
        { id: 3, name: "Roshan Silva", avatar: "https://randomuser.me/api/portraits/men/3.jpg", graded: true },
        { id: 4, name: "Methsala Kodithuwakku", avatar: "https://randomuser.me/api/portraits/women/4.jpg", graded: false },
        { id: 1, name: "Tharindra Fernando", avatar: "https://randomuser.me/api/portraits/men/1.jpg", graded: false },

      ],
      3: [
        { id: 5, name: "Dinuka Samarasekara", avatar: "https://randomuser.me/api/portraits/men/5.jpg", graded: true },
        { id: 6, name: "Sandani Fernando", avatar: "https://randomuser.me/api/portraits/women/6.jpg", graded: true },
      ],
    };

    // Fetch candidates who completed the selected exam
    const data = examCandidates[exam.id] || [];
    setCandidates(data);
    setIsModalVisible(true);
  };

  const handleGradeCandidate = (candidate: Candidate) => {
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
        const color = status === "fully graded" ? "green" : status === "partially graded" ? "orange" : "red";
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
