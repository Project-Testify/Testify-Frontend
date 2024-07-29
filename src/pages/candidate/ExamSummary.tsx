import { Row, Col, Button } from 'antd';
import ExamDetailCard from '../../components/Card/ExamDetailCard';
import ExamStatusCard from '../../components/Card/ExamStatusCard';
import ExamDescription from '../../components/Exam/ExamDescription';
import { PageHeader } from '../../components';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, ContainerOutlined, FileTextOutlined, ClockCircleOutlined, BarChartOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const topics = ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Algorithm Selection', 'Practical Applications', 'Feature Engineering'];

const instructions = [
    'Read each question carefully before answering.',
    'No additional time will be given.',
    'Ensure you have a stable internet connection.',
    'Do not refresh the browser during the quiz.',
    'The quiz is proctored, so ensure your camera and microphone are working.'
];

export const ExamSummaryPage = () => {
    const remainingAttempts = 3; 
    const availabilityDuration = '24/07/30 09:00 AM - 24/07/30 10:00 AM'; 
    const isExamAvailable = true;


    // Determine if the "Start Test" button should be disabled
    const isButtonDisabled = !isExamAvailable || remainingAttempts <= 0;

    const navigate = useNavigate();
    const handleStartExam = () => {
        navigate('/candidate/exam/diagnostic-test');
    };
    

    return (
        <div style={{ padding: '20px' }}>
            <Helmet>
                <title>Testify | Machine Learning - Quiz 3</title>
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
                                <span>Machine Learning - Quiz 3</span>
                            </>
                        ),
                        path: '/',
                    }
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
                                content="60 minutes"
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
                                availabilityDuration={availabilityDuration}
                                isExamAvailable={isExamAvailable}
                            />
                        </Col>
                        <Col span={24}>
                            <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                <Button type="primary" size="large" style={{ width: '150px' }} disabled={isButtonDisabled} onClick={handleStartExam}>
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
                                examName="Machine Learning - Quiz 3"
                                description="This quiz assesses your understanding of the fundamental concepts in machine learning, including algorithms, model evaluation, and practical applications. The quiz is designed to test both theoretical knowledge and practical skills."
                                topics={topics}
                                instructions={instructions}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default ExamSummaryPage;
