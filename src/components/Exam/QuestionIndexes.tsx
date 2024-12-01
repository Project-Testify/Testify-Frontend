import { Row, Col } from 'antd';
import './styles.css';

interface QuestionIndexesProps {
  totalQuestions: number;
  answeredIndexes: number[];
  skippedIndexes: number[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
}

export const QuestionIndexes = ({
  totalQuestions,
  answeredIndexes,
  skippedIndexes,
  currentQuestionIndex,
  onSelectQuestion,
}: QuestionIndexesProps) => {
  const renderQuestionBoxes = () => {
    const boxes = [];
    for (let i = 1; i <= totalQuestions; i++) {
      let boxClass = 'question-box';
      if (answeredIndexes.includes(i)) {
        boxClass += ' answered';
      } else if (skippedIndexes.includes(i)) {
        boxClass += ' skipped';
      }
      if (i === currentQuestionIndex + 1) {
        boxClass += ' current'; // Add the 'current' class to the selected index
      }
      boxes.push(
        <Col key={i} span={6}>
          <div
            className={boxClass}
            onClick={() => onSelectQuestion(i - 1)} // Pass the zero-based index to update the currentQuestionIndex
          >
            {i}
          </div>
        </Col>
      );
    }
    return boxes;
  };

  return <Row gutter={[8, 8]}>{renderQuestionBoxes()}</Row>;
};
