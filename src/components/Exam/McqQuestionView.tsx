import { useState } from 'react';
import { Col, Button } from 'antd';
import './styles.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
// import { useTheme } from 'antd/es/theme';

interface McqQuestionViewProps {
    question: string;
    options: string[];
    onNext: () => void;
    onPrevious: () => void;
}

// const McqQuestionView: React.FC<McqQuestionViewProps> = ({ question, options }) => {
export const McqQuestionView = ({ question, options, onNext, onPrevious }: McqQuestionViewProps) => {
    

    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const handleSelection = (index: number) => {
        setSelected(index);
    };

    const handleClearSelection = () => {
        setSelected(null);
    };

    return (
        <Col span={18} pull={6}>
            <Col span={24}>
                <div className="question-container">
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
                        
                        <Button onClick={handleClearSelection}  type="primary" size={'large'} className="clear-button button">
                            Clear
                        </Button>
                        <Button onClick={onPrevious} type="primary" icon={<LeftOutlined />} size={'large'} className="previous-button button">
                            Previous
                        </Button>
                        <Button onClick={onNext} type="primary" icon={<RightOutlined />} iconPosition={'end'} size={'large'} className="next-button button">
                            Next
                        </Button>
                    </div>
                </div>
            </Col>
        </Col>
    );
};

export default McqQuestionView;
