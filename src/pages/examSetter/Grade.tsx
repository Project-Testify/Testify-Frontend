import { Card, Table, Select, Input, Button, message } from 'antd';
import { useState } from 'react';

interface GradingQuestion {
  id: number;
  questionText: string;
  userAnswer: string;
  validAnswers: string[];
  marks: number;
  maxMarks: number;
}

const { Option } = Select;

const initialData: GradingQuestion[] = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    userAnswer: "Paris",
    validAnswers: ["Paris"],
    marks: 0,
    maxMarks: 5,
  },
  {
    id: 2,
    questionText: "Explain Newton's first law of motion.",
    userAnswer: "An object remains in motion unless acted upon by an external force.",
    validAnswers: [
      "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
    ],
    marks: 0,
    maxMarks: 10,
  },
];

const ExamSetterGrade = () => {
  const [data, setData] = useState<GradingQuestion[]>(initialData);

  const handleMarksChange = (questionId: number, value: number) => {
    const updatedData = data.map((item) =>
      item.id === questionId ? { ...item, marks: value } : item
    );
    setData(updatedData);
  };

  const handleSubmit = () => {
    // Simulate submitting the grading data
    console.log("Graded Data Submitted: ", data);
    message.success("Grading submitted successfully!");
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "User Answer",
      dataIndex: "userAnswer",
      key: "userAnswer",
      render: (text: string) => <Input.TextArea value={text} readOnly autoSize />,
    },
    {
      title: "Valid Answers",
      dataIndex: "validAnswers",
      key: "validAnswers",
      render: (answers: string[]) => (
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Allocate Marks",
      key: "marks",
      render: (_: any, record: GradingQuestion) => (
        <Select
          value={record.marks}
          onChange={(value) => handleMarksChange(record.id, value)}
          style={{ width: 100 }}
        >
          {Array.from({ length: record.maxMarks + 1 }, (_, index) => (
            <Option key={index} value={index}>
              {index}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <Card
      style={{ width: "100%", marginTop: 16 }}
      title="Grading Page"
      extra={
        <Button type="primary" onClick={handleSubmit}>
          Submit Grades
        </Button>
      }
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </Card>
  );
};

export  {ExamSetterGrade};
