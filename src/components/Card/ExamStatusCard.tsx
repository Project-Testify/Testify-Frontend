import React from 'react';
import { Card, Row, Col } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import './styles.css';

interface ExamStatusCardProps {
    remainingAttempts: number;
    availabilityDuration: string;
    isExamAvailable: boolean;
}

export const ExamStatusCard: React.FC<ExamStatusCardProps> = ({ remainingAttempts, availabilityDuration, isExamAvailable }) => {
    return (
        <Card>
            <Row gutter={[16, 16]}>
                {isExamAvailable ? (
                    <>
                        <Col span={24}>
                            <div className="exam-status-card">
                                <CalendarOutlined className={`icon calendar-icon`} />
                                <div>
                                    <div className="bold-text">Available Between: </div>
                                    <div className="details">{availabilityDuration}</div>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="exam-status-card">
                                {remainingAttempts > 0 ? (
                                    <CheckCircleOutlined className={`icon check-icon`} />
                                ) : (
                                    <StopOutlined className={`icon stop-icon`} />
                                )}
                                <div>
                                    <div className="bold-text">Remaining Attempts: &nbsp;
                                    <span className="details">{remainingAttempts}</span></div>
                                </div>
                            </div>
                        </Col>
                    </>
                ) : (
                    <Col span={24}>
                        <div className="exam-status-card">
                            <StopOutlined className={`icon stop-icon`} />
                            <div>
                                <div className="bold-text">Exam Not Available Until: </div>
                                <div className="details">{availabilityDuration}</div>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </Card>
    );
};

export default ExamStatusCard;
