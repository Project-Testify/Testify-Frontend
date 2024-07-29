import {CSSProperties} from 'react';
import { Col, theme, Divider, Button } from 'antd';
import { CountdownTimer } from './CountdownTimer';
import { QuestionIndexes } from './QuestionIndexes';
import './styles.css';

interface TimeContainerProps {
    totalQuestions: number;
    answeredIndexes: number[];
    skippedIndexes: number[];
}



export const TimeContainer = ({ totalQuestions, answeredIndexes, skippedIndexes }: TimeContainerProps) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    const timeContStyle: CSSProperties = {
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
    };

    const countdownStyle: CSSProperties = {
        textAlign: 'center',
        padding: '12px 24px',
        background: colorBgContainer,
        border: '2px solid #1890FF',
        borderRadius: borderRadiusLG,
    };

    const topicStyle: CSSProperties = {
        display: 'block',
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    };

    // const totalQuestions = 20;
    // const answeredIndexes = [1, 3, 4, 5, 6, 7];
    // const skippedIndexes = [2, 8];

    return (
        <Col span={6} push={18}>
            <Col span={24}>
                <div style={timeContStyle}>
                    <div style={countdownStyle}>
                        <span style={topicStyle}>Time Remaining</span>
                        <CountdownTimer initialHours={0} initialMinutes={60} initialSeconds={0} />
                    </div>
                    <Divider />
                    {/* <p>Question Indexes:</p> */}
                    <QuestionIndexes totalQuestions={totalQuestions} answeredIndexes={answeredIndexes} skippedIndexes={skippedIndexes} />
                    <Divider />
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button type="primary" size={'large'} className="submit-button" >
                                Submit Exam
                        </Button>
                    </div>
            
                </div>
            </Col>
        </Col>
        
    );
};
