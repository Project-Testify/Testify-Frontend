import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button, Spin, message } from 'antd';
import ExamDetailCard from '../../components/Card/ExamDetailCard';
import ExamStatusCard from '../../components/Card/ExamStatusCard';
import ExamDescription from '../../components/Exam/ExamDescription';
import { PageHeader } from '../../components';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { HomeOutlined, ContainerOutlined, FileTextOutlined, ClockCircleOutlined, BarChartOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
// import { Organization } from '../authentication/forms/Organization';

export const ExamSummaryPage = () => {
    const navigate = useNavigate();

    // Extract id from query parameters
    const location = useLocation();
    const {id} = location.state || {};

    const [examData, setExamData] = useState<{
        title: string;
        description: string;
        duration: number;
        topics: string;
        instructions: string;
        startTime: string;
        endTime: string;
        status: string;
    } | null>(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamDetails = async () => {
            if (!id) {
                console.error('Exam ID is missing from the URL.');
                message.error('Exam ID is missing.');
                return;
            }

            try {
                // Get the JWT token from sessionStorage
                const token = sessionStorage.getItem('accessToken');
        
                // Ensure the token is available
                if (!token) {
                    console.error('No JWT token found. Please log in.');
                    message.error('You need to log in to view the exam details.');
                    return;
                }
        
                // Construct the full URL for the exam details endpoint
                const url = `http://localhost:8080/api/v1/candidate/exams/${id}`;
        
                // Make the GET request using axios with the Authorization header
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
        
                // Set the fetched exam data in the state
                setExamData(response.data);
            } catch (error) {
                console.error('Error fetching exam details:', error);
                message.error('Failed to load exam details. Please try again.');
            } finally {
                setLoading(false); // Set loading state to false after the request completes
            }
        };

        fetchExamDetails();
    }, [id]);

    const handleStartExam = (examName : string) => {
        navigate(`/candidate/exam/view`, {
            state: {
                id: id,
                name: examName,
            },
        });
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    }

    if (!examData) {
        return <div>Exam not found</div>;
    }

    const {
        title,
        description,
        duration,
        topics,
        instructions,
        startTime,
        endTime,
        status,
    } = examData;

    const isExamAvailable = status === 'ONGOING';
    const remainingAttempts = isExamAvailable ? 1 : 0;
    const isButtonDisabled = !isExamAvailable || remainingAttempts <= 0;

    const formatDateTime = (dateTime: any) => {
        const date = new Date(dateTime);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}  ${hours}:${minutes}`;
    };

    return (
        <div style={{ padding: '20px' }}>
            <Helmet>
                <title>Testify | {title}</title>
            </Helmet>
            <PageHeader
                title="Exam Summary"
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
                                <span>{title}</span>
                            </>
                        ),
                        path: `/candidate/exams/${id}`,
                    },
                ]}
            />
            <Row gutter={[16, 16]}>
                <Col span={8} push={16}>
                    <Row gutter={[16, 16]} justify="center">
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<FileTextOutlined />}
                                title="Type"
                                content="Multiple Choice"
                            />
                        </Col>
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<ClockCircleOutlined />}
                                title="Time"
                                content={`${duration} minutes`}
                            />
                        </Col>
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<BarChartOutlined />}
                                title="Level"
                                content="Intermediate"
                            />
                        </Col>
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<SafetyCertificateOutlined />}
                                title="Proctoring"
                                content="Yes"
                            />
                        </Col>
                        <Col span={22}>
                            <ExamStatusCard
                                remainingAttempts={remainingAttempts}
                                availabilityDuration={`${formatDateTime(startTime)} - ${formatDateTime(endTime)}`}
                                isExamAvailable={isExamAvailable}
                            />
                        </Col>
                        <Col span={24}>
                            <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                <Button type="primary" size="large" style={{ width: '150px' }} disabled={isButtonDisabled} onClick={() => handleStartExam(title)}>
                                    Start Exam
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={16} pull={8}>
                    <Row gutter={[16, 16]} justify="center">
                        <Col span={24}>
                            <ExamDescription
                                examName={title}
                                description={description}
                                topics={typeof topics === 'string' ? topics.split(',') : []}
                                instructions={instructions}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
