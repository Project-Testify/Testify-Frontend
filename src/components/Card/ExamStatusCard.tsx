import React from 'react';
import { Card, Row, Col } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '16px' }} />
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Available Between: </div>
                                    <div style={{ fontSize: '15px' }}>{availabilityDuration}</div>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {remainingAttempts > 0 ? (
                                    <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a', marginRight: '16px' }} />
                                ) : (
                                    <StopOutlined style={{ fontSize: '24px', color: '#ff4d4f', marginRight: '16px' }} />
                                )}
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Remaining Attempts: &nbsp;
                                    <span style={{ fontSize: '15px', fontWeight: 'normal' }}>{remainingAttempts}</span></div>
                                </div>
                            </div>
                        </Col>
                    </>
                ) : (
                    <Col span={24}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StopOutlined style={{ fontSize: '24px', color: '#ff4d4f', marginRight: '16px' }} />
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Not Available Until: </div>
                                <div style={{ fontSize: '15px' }}>{availabilityDuration}</div>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </Card>
    );
};

export default ExamStatusCard;
