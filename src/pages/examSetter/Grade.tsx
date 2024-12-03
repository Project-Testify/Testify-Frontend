import { Card, Table, Select, Button, message, Space } from 'antd';
import { useEffect, useState } from 'react';

import { gradeQuestion, GradeQuestionResponse } from '../../api/services/AIAssistant';


import { getEssayDetails } from '../../api/services/grade';
import { AxiosResponse } from 'axios';
import { get } from 'lodash';

import { useNavigate } from 'react-router-dom';

// redirect



interface CoverPoint {
  coverPointText: string; // Description of the point to cover
  marks: number;         // Marks allocated to the point
}

interface GradingQuestion {
  id: number;
  questionText: string;
  userAnswer: string;
  coverPoints: CoverPoint[];
  feedback?: {
    correct_points: string[];
    incorrect_points: string[];
  };
  marks: number;
  maxMarks: number;
}




const { Option } = Select;



const initialData: GradingQuestion[] = [
  {
    id: 2,
    questionText: "What were main reasons for the start of World War II?",
    userAnswer: "Germany's invasion of Poland, The United States' attack on Japan",
    coverPoints: [
      { coverPointText: "Germany's invasion of Poland", marks: 5 },
    ],
    // feedback: {
    //   correct_points: ["Germany's invasion of Poland"],
    //   incorrect_points: ["The United States' attack on Japan"],
    // },
    marks: 5,
    maxMarks: 10,
  },
  {
    id: 4,
    questionText: "What were two causes of the American Civil War?",
    userAnswer: "The issue of slavery, The Southern states' belief in the necessity of a strong central government",
    coverPoints: [
      { coverPointText: "The issue of slavery", marks: 5 },
    ],
    // feedback: {
    //   correct_points: ["The issue of slavery"],
    //   incorrect_points: ["The Southern states' belief in the necessity of a strong central government"],
    // },
    marks: 5,
    maxMarks: 10,
  },
  {
    id: 5,
    questionText: "What were two significant achievements of Napoleon Bonaparte during his rule?",
    userAnswer: "The establishment of the Napoleonic Code, His successful invasion and permanent conquest of Russia",
    coverPoints: [
      { coverPointText: "The establishment of the Napoleonic Code", marks: 5 },
    ],
    // feedback: {
    //   correct_points: ["The establishment of the Napoleonic Code"],
    //   incorrect_points: ["His successful invasion and permanent conquest of Russia"],
    // },
    marks: 5,
    maxMarks: 10,
  },
  {
    id: 6,
    questionText: "Which of the following was a primary cause of the French Revolution?",
    userAnswer: "The effects of the industrial revolution on French factories, The severe hunger and economic problems faced by ordinary French citizens, Foreign countries invading France and causing rebellion.",
    coverPoints: [
      { coverPointText: "The severe hunger and economic problems faced by ordinary French citizens", marks: 5 },
    ],
    // feedback: {
    //   correct_points: ["The severe hunger and economic problems faced by ordinary French citizens"],
    //   incorrect_points: [
    //     "The effects of the industrial revolution on French factories",
    //     "Foreign countries invading France and causing rebellion",
    //   ],
    // },
    marks: 5,
    maxMarks: 10,
  },
  {
    id: 7,
    questionText: "Which of the following was a major reason for the Revolt of 1857 in India?",
    userAnswer: "The introduction of Western-style education, The discontent among Indian soldiers due to cultural insensitivity, The establishment of the Indian National Congress.",
    coverPoints: [
      { coverPointText: "The discontent among Indian soldiers due to cultural insensitivity", marks: 5 },
    ],
    // feedback: {
    //   correct_points: ["The discontent among Indian soldiers due to cultural insensitivity"],
    //   incorrect_points: [
    //     "The introduction of Western-style education",
    //     "The establishment of the Indian National Congress",
    //   ],
    // },
    marks: 5,
    maxMarks: 10,
  },
];



const highlightTextWithFeedback = (
  text: string,
  feedback: GradingQuestion['feedback']
) => {
  let correctPatterns: RegExp[] = [];
  let incorrectPatterns: RegExp[] = [];

  if (feedback) {
    correctPatterns = feedback.correct_points.map((point) => new RegExp(`\\b${point}\\b`, "gi"));
    incorrectPatterns = feedback.incorrect_points.map((point) => new RegExp(`\\b${point}\\b`, "gi"));
  }


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
    const highlightStyle = style === "correct" 
    ? { backgroundColor: "#d4f7d4", color: "green" }  // Lighter green background, green text
    : { backgroundColor: "#f7d4d4", color: "red" };  // Lighter red background, red text

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

  const [error, setError] = useState<string | null>(null);

  const examID = 1;
  const userID = 1;

  const navigate = useNavigate();


// 
useEffect(() => {
  const fetchEssayDetails = async () => {
      setLoading(true);
      setError(null);
      
      getEssayDetails(examID, userID).then((response) =>{
        const essayDetails = response.data.map((question) => ({
          // id: question.id,
          id:1,
          questionText: question.questionText,
          userAnswer: question.userAnswer,
          coverPoints: question.coverPoints.map((point) => ({
            coverPointText: point.coverPointText,
            marks: point.marks,
          })),
          marks: 0,
          maxMarks: question.coverPoints.reduce((total, point) => total + point.marks, 0),
        }));
        setData(essayDetails);
        setLoading(false);
      })

      fetchEssayDetails();


    

  };
}, [examID, userID]);



  const handleMarksChange = (questionId: number, value: number) => {
    const updatedData = data.map((item) =>
      item.id === questionId ? { ...item, marks: value } : item
    );
    setData(updatedData);
  };


  const [loading, setLoading] = useState(false);




  const AIGrade = async () => {
    setLoading(true); // Start loading
  
    const gradingPromises = data.map((question) => {
      const requestData = {
        question: question.questionText,
        answer: question.userAnswer,
        valid_points: question.coverPoints.map((point) => point.coverPointText),
      };
  
      return gradeQuestion(requestData)
        .then((response) => {
          const { correct_points, incorrect_points } = response.data;
          setData((currentData) =>
            currentData.map((item) =>
              item.id === question.id
                ? {
                    ...item,
                    feedback: { correct_points, incorrect_points },
                  }
                : item
            )
          );
        })
        .catch((error) => {
          console.error("Failed to grade question", question.id, error);
        });
    });
  
    try {
      await Promise.all(gradingPromises); // Wait for all grading to complete
    } catch (error) {
      console.error("An error occurred while grading all questions", error);
    } finally {
      setLoading(false); // Stop loading after all promises are resolved
    }
  };
  
  


  const handleSubmit = () => {
    console.log("Graded Data Submitted: ", data);
    message.success("Grading submitted successfully!");

    navigate('/examsetter/grading'); 

  };

  const columns = [
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Submited Answer",
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
      title="Grading Exam"
      extra={
        <>
        <Space>
        <Button type="primary" onClick={AIGrade} loading={loading}>
          Grade with AI
          </Button>

        <Button type="primary" onClick={handleSubmit}>
          Submit Grades
        </Button>
        </Space>
        </>

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
