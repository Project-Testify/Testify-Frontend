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

export const ExamSummaryPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { id } = location.state || {};

    const [examData, setExamData] = useState<{
        title: string;
        description: string;
        examType: string;
        duration: number;
        topics: string;
        instructions: string;
        startTime: string;
        endTime: string;
        status: string;
    } | null>(null);

    const [loading, setLoading] = useState(true);
    const [sessionExists, setSessionExists] = useState(false);

    useEffect(() => {
        const fetchExamDetails = async () => {
            if (!id) {
                console.error('Exam ID is missing from the URL.');
                message.error('Exam ID is missing.');
                return;
            }

            try {
                const token = sessionStorage.getItem('accessToken');
                if (!token) {
                    console.error('No JWT token found. Please log in.');
                    message.error('You need to log in to view the exam details.');
                    return;
                }

                const url = `http://localhost:8080/api/v1/candidate/exams/${id}`;
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                setExamData(response.data);
            } catch (error) {
                console.error('Error fetching exam details:', error);
                message.error('Failed to load exam details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const checkActiveSession = async () => {
            try {
                // Mock the response for active session check
                const response = { data: { active: false } }; // Mocking as no API exists
                setSessionExists(response.data.active);
            } catch (error) {
                console.error('Error checking active session:', error);
                setSessionExists(false);
            }
        };

        fetchExamDetails();
        checkActiveSession();
    }, [id]);

    const handleStartOrContinueExam = async (examName: string) => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            message.error('You need to log in to start or continue the exam.');
            return;
        }
    
        if (sessionExists) {
            // Navigate to continue exam
            navigate('/candidate/exam/view', {
                state: { id, name: examName, examType: examData?.examType },
              });
        } else {
            // Create a new session
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/v1/exam/start',
                    { examId: id },
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
    
                if (response.status === 200 || response.status === 201) {
                    message.success('Session started successfully.');
                    setSessionExists(true);
    
                    // Store the sessionId in sessionStorage
                    const sessionId = response.data.sessionId;  // Assuming the response structure contains the sessionId
                    sessionStorage.setItem('sessionId', sessionId);
                    sessionStorage.setItem('examType', examData?.examType || '');
                    sessionStorage.setItem('examId', id);
    
                    // Navigate to the exam view page
                    navigate(`/candidate/exam/view`, {
                        state: { id, name: examName },
                    });
                } else {
                    throw new Error('Failed to start session');
                }
            } catch (error) {
                console.error('Error starting session:', error);
                message.error('Could not start the exam. Please try again.');
            }
        }
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
        examType,
        duration,
        topics,
        instructions,
        startTime,
        endTime,
        status,
    } = examData;

    const isExamAvailable = status === 'ONGOING' || status === 'AVAILABLE';
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
                                content={
                                    examType === 'MCQ' ? 'Multiple Choice' :
                                    examType === 'ESSAY' ? 'Essay' :
                                    examType === 'MIXED' ? 'Mixed' :
                                    examType
                                }
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
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{ width: '150px' }}
                                    disabled={isButtonDisabled}
                                    onClick={() => handleStartOrContinueExam(title)}
                                >
                                    {sessionExists ? 'Continue Exam' : 'Start Exam'}
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
