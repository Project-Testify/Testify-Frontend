import { useState, useEffect } from 'react';
import { Col, Button, Card } from 'antd';
import './styles.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface McqQuestionViewProps {
  question: string;
  options: string[];
  selectedAnswer?: string;
  onNext: () => void;
  onPrevious: () => void;
  onAnswer: (answer: string) => void;
  onClearSelection: () => void;
}

export const McqQuestionView = ({
  question,
  options,
  selectedAnswer,
  onNext,
  onPrevious,
  onAnswer,
  onClearSelection,
}: McqQuestionViewProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selectedAnswer) {
      const index = options.indexOf(selectedAnswer);
      setSelected(index !== -1 ? index : null);
    }
  }, [selectedAnswer, options]);

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
          <p className="question-style">{question}</p>
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
            <Button onClick={handleClearSelection} type="primary" size="large" className="clear-button button">
              Clear
            </Button>
            <Button onClick={onPrevious} type="primary" icon={<LeftOutlined />} size="large" className="previous-button button">
              Previous
            </Button>
            <Button onClick={onNext} type="primary" icon={<RightOutlined  />} size="large" className="next-button button">
              Next
            </Button>
          </div>
        </Card>
      </Col>
    </Col>
  );
};

export default McqQuestionView;
