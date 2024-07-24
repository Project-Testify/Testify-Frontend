import { useState } from 'react';
import { Col, Button, Input } from 'antd';
import './styles.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

// import { useTheme } from 'antd/es/theme';

interface EssayQuestionViewProps {
    question: string;
    length: number;
    onNext: () => void;
    onPrevious: () => void;
}

// const McqQuestionView: React.FC<McqQuestionViewProps> = ({ question, options }) => {
export const EssayQuestionView = ({ question, length, onNext, onPrevious }: EssayQuestionViewProps) => {
    
    const { TextArea } = Input;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const [content, setContent] = useState('');

    const handleClearContent = () => {
        setContent('');
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
