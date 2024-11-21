import { Card, Table, Select, Input, Button, message } from 'antd';
import { useState } from 'react';

interface GradingQuestion {
  id: number;
  questionText: string;
  userAnswer: string;
  feedback: {
    correct_points: string[];
    incorrect_points: string[];
  };
  marks: number;
  maxMarks: number;
}

const { Option } = Select;

const initialData: GradingQuestion[] = [
  {
    id: 1,
    questionText: "List five Linux distributions?",
    userAnswer: "Ubuntu , Fedora, macOS, Arch Linux ",
    feedback: {
      correct_points: [ "Ubuntu",
        "Fedora",
        "Arch Linux"],
      incorrect_points: [ "macOS"],
    },
    marks: 0,
    maxMarks: 5,
  },
  {
    id: 2,
    questionText: "Explain Newton's first law of motion.",
    userAnswer: "An object remains in motion unless acted upon by an external force.",
    feedback: {
      correct_points: [
        "An object remains in motion unless acted upon by an external force",
      ],
      incorrect_points: [
        "An object at rest stays at rest",
        "An object in motion stays in motion unless acted upon by an external force",
      ],
    },
    marks: 0,
    maxMarks: 10,
  },
];

const highlightTextWithFeedback = (
  text: string,
  feedback: GradingQuestion['feedback']
) => {
  const correctPatterns = feedback.correct_points.map((point) => new RegExp(`\\b${point}\\b`, "gi"));
  const incorrectPatterns = feedback.incorrect_points.map((point) => new RegExp(`\\b${point}\\b`, "gi"));

  // Avoid overlapping matches by tracking used ranges
  const matchedRanges: { start: number; end: number; style: "correct" | "incorrect" }[] = [];

  correctPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matchedRanges.push({
        start: match.index,
        end: match.index + match[0].length,
        style: "correct",
      });
    }
  });

  incorrectPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matchedRanges.push({
        start: match.index,
        end: match.index + match[0].length,
        style: "incorrect",
      });
    }
  });

  // Sort ranges to process text sequentially
  matchedRanges.sort((a, b) => a.start - b.start);

  let lastIndex = 0;
  const result: React.ReactNode[] = [];

  matchedRanges.forEach(({ start, end, style }, index) => {
    // Add plain text before the match
    if (lastIndex < start) {
      result.push(<span key={`plain-${index}`}>{text.slice(lastIndex, start)}</span>);
    }

    // Add highlighted text
    const highlightStyle = style === "correct" ? { backgroundColor: "green", color: "white" } : { backgroundColor: "red", color: "white" };
    result.push(
      <span key={`highlight-${index}`} style={highlightStyle}>
        {text.slice(start, end)}
      </span>
    );

    lastIndex = end;
  });

  // Add remaining plain text
  if (lastIndex < text.length) {
    result.push(<span key="plain-end">{text.slice(lastIndex)}</span>);
  }

  return result;
};


const ExamSetterGrade = () => {
  const [data, setData] = useState<GradingQuestion[]>(initialData);

  const handleMarksChange = (questionId: number, value: number) => {
    const updatedData = data.map((item) =>
      item.id === questionId ? { ...item, marks: value } : item
    );
    setData(updatedData);
  };

  const handleSubmit = () => {
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
      render: (text: string, record: GradingQuestion) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {highlightTextWithFeedback(text, record.feedback)}
        </div>
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

export { ExamSetterGrade };
