import { Row, Col } from 'antd';
import './styles.css';

interface QuestionIndexesProps {
    totalQuestions: number;
    answeredIndexes: number[];
    skippedIndexes: number[];
}

export const QuestionIndexes = ({ totalQuestions, answeredIndexes, skippedIndexes }: QuestionIndexesProps) => {
    const renderQuestionBoxes = () => {
        const boxes = [];
        for (let i = 1; i <= totalQuestions; i++) {
            let boxClass = 'question-box';
            if (answeredIndexes.includes(i)) {
                boxClass += ' answered';
            } else if (skippedIndexes.includes(i)) {
                boxClass += ' skipped';
            }

            boxes.push(
                <Col span={6} key={i}>
                    <div className={boxClass}>{i}</div>
                </Col>
            );
        }
        return boxes;
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                {renderQuestionBoxes()}
            </Row>
        </div>
    );
};
