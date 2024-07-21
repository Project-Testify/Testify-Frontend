// ExamDescription.tsx
import React from 'react';
import { Tag } from 'antd';
import { CSSProperties } from 'react';

interface ExamDescriptionProps {
    examName: string;
    description: string;
    topics: string[];
    instructions: string[];
}

const topicStyle: CSSProperties = {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '8px',
};

const descriptionStyle: CSSProperties = {
    fontSize: '17px',
    marginBottom: '8px',
    textAlign: 'justify',
}

const subtopicStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
}

const tagStyle: CSSProperties = {
    fontSize: '15px',
    marginBottom: '8px',
    marginRight: '8px',
}

const insStyle: CSSProperties = {
    fontSize: '16px',
    marginBottom: '8px',
}

const ExamDescription: React.FC<ExamDescriptionProps> = ({ examName, description, topics, instructions }) => {
    return (
        <div>
            <span style={topicStyle}>{examName}</span>
            <p style={descriptionStyle}>{description}</p>
            <p  style={subtopicStyle}>Covered Topics:</p>
            <div>
                {topics.map((topic, index) => (
                    <Tag key={index} color="blue" style={tagStyle}>
                        {topic}
                    </Tag>
                ))}
            </div>
            <p style={subtopicStyle}>Instructions:</p>
            <ul>
                {instructions.map((instruction, index) => (
                    <li key={index} style={insStyle}>{instruction}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExamDescription;
