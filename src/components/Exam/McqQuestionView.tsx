import { useState, CSSProperties } from 'react';
import { Col, theme } from 'antd';
// import { useTheme } from 'antd/es/theme';

interface McqQuestionViewProps {
    question: string;
    options: string[];
}

// const McqQuestionView: React.FC<McqQuestionViewProps> = ({ question, options }) => {
export const McqQuestionView = ({ question, options }: McqQuestionViewProps) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme;

    const questionContainerStyle: CSSProperties = {
        padding: '1px 24px',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
    };

    

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

    return (
        <Col span={18} pull={6}>
            <Col span={24}>
                <div style={questionContainerStyle}>
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
                </div>
            </Col>
        </Col>
    );
};

export default McqQuestionView;
