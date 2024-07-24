// ExamDetailCard.tsx
import React from 'react';
import { Card } from 'antd';
import { CSSProperties } from 'react';

interface ExamDetailCardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
}

const iconStyle: CSSProperties = {
    fontSize: '24px',
    color: '#1890ff',
    display: 'block',
    marginBottom: '8px',
    textAlign: 'center' as 'center'
};

const topicsStyle: CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold' as 'bold',
    textAlign: 'center' as 'center',
};

const contentStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: '15px',
    marginBottom: '8px',
};

const cardStyle: CSSProperties = {
    backgroundColor: 'white',
};

const ExamDetailCard: React.FC<ExamDetailCardProps> = ({ icon, title, content }) => {
    return (
        <Card bordered={false} style={cardStyle}>
            <div style={iconStyle}>{icon}</div>
            <span style={topicsStyle}>{title}</span>
            <div style={contentStyle}>{content}</div>
        </Card>
    );
};

export default ExamDetailCard;
