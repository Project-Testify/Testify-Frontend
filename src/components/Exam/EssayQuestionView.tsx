import { useState } from 'react';
import { Col, Button, Input } from 'antd';
import './styles.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface EssayQuestionViewProps {
    question: string;
    length: number;
    onNext: () => void;
    onPrevious: () => void;
    onAnswer: () => void;
    onClearSelection: () => void;
}

// const McqQuestionView: React.FC<McqQuestionViewProps> = ({ question, options }) => {
export const EssayQuestionView = ({ question, length, onNext, onPrevious, onAnswer, onClearSelection }: EssayQuestionViewProps) => {
    
    const { TextArea } = Input;
    const [content, setContent] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setContent(text);
        if (text.length > 0) {
            onAnswer();
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
                <div className="question-container">
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
                        
                        <Button onClick={handleClearContent}  type="primary" size={'large'} className="clear-button button">
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

export default EssayQuestionView;
