import { useState, useEffect } from 'react';
import { Col, Button, Input, Card } from 'antd';
import './styles.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface EssayQuestionViewProps {
    question: string;
    length: number;
    selectedAnswer?: string;
    onNext: () => void;
    onPrevious: () => void;
    onAnswer: (answer: string) => void;
    onClearSelection: () => void;
}

export const EssayQuestionView = ({
    question,
    length,
    selectedAnswer,
    onNext,
    onPrevious,
    onAnswer,
    onClearSelection,
}: EssayQuestionViewProps) => {
    
    const { TextArea } = Input;
    const [content, setContent] = useState('');

    useEffect(() => {
        if (selectedAnswer) {
            setContent(selectedAnswer);
        }
    }, [selectedAnswer]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setContent(text);
        if (text.length > 0) {
            onAnswer(text);
        } else {
            onClearSelection();
        }
    };

    const handleClearContent = () => {
        setContent('');
        onClearSelection();
    };

    return (
        <Col span={18} pull={6}>
            <Col span={24}>
                <Card>
                    <p className="question-style">{question}</p>
                    <TextArea
                        showCount
                        maxLength={length}
                        onChange={handleChange}
                        placeholder='Type your answer here...'
                        style={{ height: 360, resize: 'none', fontSize: '16px' }}
                        value={content}
                    />
                    <div className="button-container">
                        <Button onClick={handleClearContent} type="primary" size="large" className="clear-button button">
                            Clear
                        </Button>
                        <Button onClick={onPrevious} type="primary" icon={<LeftOutlined />} size="large" className="previous-button button">
                            Previous
                        </Button>
                        <Button onClick={onNext} type="primary" icon={<RightOutlined />} size="large" className="next-button button">
                            Next
                        </Button>
                    </div>
                </Card>
            </Col>
        </Col>
    );
};

export default EssayQuestionView;
