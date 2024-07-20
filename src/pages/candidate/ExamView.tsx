import { Row, Col, theme } from 'antd';
import { CSSProperties, useState } from 'react';
import './ExamView.css';

import {
  HomeOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

import {
  PageHeader,
} from '../../components';

import { Helmet } from 'react-helmet-async';



export const ExamViewPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const questionContainerStyle: CSSProperties = {
        padding: '1px 24px',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
    };
    
    const timeStyle: CSSProperties = {
        padding: 24,
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

        <div style={{ padding: '20px' }}>
        <Helmet>
          <title>Testify | Machine Learning - Quiz 3</title>
        </Helmet>
        <PageHeader
          title="Machine Learning - Quiz 3"
          breadcrumbs={[
            {
              title: (
                <>
                  <HomeOutlined />
                  <span>home</span>
                </>
              ),
              path: '/',
            },
            {
              title: (
                <>
                  <ContainerOutlined />
                  <span>Machine Learning - Quiz 3</span>
                </>
              ),
              path: '/',
            }
          ]}
        />

        <Row gutter={[16, 16]}>
             {/* ----------------Time Container----------------- */}
             {/* ----------------Yeah I know, the second one comes first. Why? who tf knows :| ----------------- */}
            <Col span={6} push={18}> 
                <Col span={24}>
                    <div style={timeStyle}>
                        Time Remaining
                    </div>
                </Col>
            </Col>
            {/* ----------------Question Container----------------- */}
            <Col span={18} pull={6}>
                <Col span={24}>
                    <div style={questionContainerStyle}>
                        <p className="question-style">5. Which of the following algorithms is typically used for classification tasks in machine learning?</p>
                        {['K-Means Clustering', 'Linear Regression', 'Support Vector Machine (SVM)', 'Principal Component Analysis (PCA)'].map((answer, index) => (
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
        </Row>
        </div>
    );

};