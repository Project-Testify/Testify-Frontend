import { useState, useEffect } from 'react';
import { Col, Button, Card } from 'antd';
import './styles.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface McqQuestionViewProps {
  question: string;
  options: string[];
  selectedAnswer?: string;
  questionNumber: number;
  onNext: () => void;
  onPrevious: () => void;
  onAnswer: (answer: string) => void;
  onClearSelection: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
  disableClear: boolean;
}

export const McqQuestionView = ({
  question,
  questionNumber,
  options,
  selectedAnswer,
  onNext,
  onPrevious,
  onAnswer,
  onClearSelection,
  disableNext,
  disablePrevious,
  disableClear,
}: McqQuestionViewProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
const [selected, setSelected] = useState<number | null>(null);

// Update selected state when the selectedAnswer or options change
useEffect(() => {
  if (selectedAnswer) {
    const index = options.indexOf(selectedAnswer);
    setSelected(index !== -1 ? index : null);
  }
}, [selectedAnswer, options]);

// Reset selected state when the question changes, only if the question is unanswered
useEffect(() => {
  if (!selectedAnswer) {
    setSelected(null); // Reset only if the question is unanswered
  }
}, [questionNumber, selectedAnswer]); // Dependency on questionNumber and selectedAnswer

const handleMouseEnter = (index: number) => {
  setHovered(index);
};

const handleMouseLeave = () => {
  setHovered(null);
};

const handleSelection = (index: number) => {
  setSelected(index);
  onAnswer(options[index]);
};

const handleClearSelection = () => {
  setSelected(null);
  onClearSelection();
};


  return (
    <Col span={18} pull={6}>
      <Col span={24}>
        <Card>
          <p className="question-style">
            {`${questionNumber}. ${question}`}
          </p>
          {options.map((answer, index) => (
            <Col span={24} key={index}>
              <div
                className={`answer-container ${hovered === index ? 'hovered' : ''} ${selected === index ? 'selected' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSelection(index)}
              >
                <input 
                  type="radio"
                  id={`option${index}`}
                  name="mcq"
                  value={`option${index}`}
                  className={`radio-button ${hovered === index ? 'hovered' : ''}`}
                  checked={selected === index}
                  onChange={() => handleSelection(index)}
                />
                <label className="answer" htmlFor={`option${index}`}>{answer}</label>
              </div>
            </Col>
          ))}
          <div className="button-container">
            <Button onClick={handleClearSelection} type="primary" size="large" className="clear-button button" disabled={disableClear}>
              Clear
            </Button>
            <Button onClick={onPrevious} type="primary" icon={<LeftOutlined />} size="large" className="previous-button button" disabled={disablePrevious}>
              Previous
            </Button>
            <Button onClick={onNext} type="primary" icon={<RightOutlined />} size="large" className="next-button button" disabled={disableNext}>
              Next
            </Button>
          </div>
        </Card>
      </Col>
    </Col>
  );
};

export default McqQuestionView;
