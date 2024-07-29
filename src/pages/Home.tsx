import { Button, Col, Flex, Image, Row, Typography} from 'antd';
import { useMediaQuery } from 'react-responsive';
import {
  PATH_AUTH,
  // PATH_CORPORATE,
  // PATH_ERROR,
  // PATH_USER_PROFILE,
} from '../constants';
import { Link } from 'react-router-dom';
import {
  HourglassFilled,
  LoginOutlined,
  QuestionCircleFilled,
  SafetyCertificateFilled,
  SettingFilled,
  TrophyFilled,
  VideoCameraFilled,
} from '@ant-design/icons';
import { Card, Container} from '../components';
import { createElement, useState, useEffect} from 'react';
import { COLOR } from '../App';
import FooterNav from '../layouts/app/FooterNav';
import HomeNav from '../components/HomeNav';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets';


const { Title, Text } = Typography;


const ORG_FEATURES = [
  {
    title: 'Interactive Question Types',
    description:
      ' From drag-and-drop to coding challenges, make exams more engaging and immersive.',
    icon: QuestionCircleFilled,
  },
  {
    title: 'Support Candidates in Real-Time',
    description: 'Provide instant guidance with integrated video and real-time chat features.',
    icon: HourglassFilled,
  },
  {
    title: 'Streamline Grading',
    description: 'Accelerate grading with AI assistance, custom parameters, and plagiarism checking.',
    icon: SafetyCertificateFilled,
  },
  {
    title: 'Simplify Proctoring',
    description: 'Easily assign proctors and manage exam settings to maintain control over the exam process.',
    icon: VideoCameraFilled,
  },
  {
    title: 'Customize Exams',
    description:
      'Use smart algorithms to dynamically select questions, ensuring varied and fair exams.',
    icon: SettingFilled,
  },
  {
    title: 'Motivate Candidates',
    description: 'Encourage engagement with digital badges and leaderboards.ersive.',
    icon: TrophyFilled,
  },
];

const CANDIDATE_FEATURES = [
  {
    title: 'Interactive Exams',
    description: ' Enjoy dynamic question types like drag-and-drop, coding challenges, and more to keep you engaged.',
    icon: TrophyFilled
  },
  {
    title: 'Real-Time Support',
    description: 'Access live video and chat support for instant guidance during your exams.',
    icon: TrophyFilled
  },
  {
    title: 'Secure Testing Environment',
    description: ' Benefit from browser lockdown, two-factor authentication (2FA), session timeouts, and IP restrictions for a safe exam experience.',
    icon: TrophyFilled
  },
  {
    title: 'Digital Badges & Leaderboards',
    description: 'Stay motivated with achievements and see how you rank against others on the leaderboard.',
    icon: TrophyFilled
  },
  {
    title: 'Mobile-Friendly Experience',
    description: 'Take your exams on any device with our fully responsive mobile design.',
    icon: TrophyFilled
  },
  {
    title: 'Smart Grading',
    description: 'Get your answers graded quickly with AI-driven grading, custom parameters, and comprehensive plagiarism checks.',
    icon: TrophyFilled,
  },
];

export const HomePage = () => {
  
  const [showOrgFeatures, setShowOrgFeatures] = useState(true);
  const features = showOrgFeatures ? ORG_FEATURES : CANDIDATE_FEATURES;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowOrgFeatures((prev) => !prev);
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  const selectedOrgStyle = {
    //outline: '2px solid ' + COLOR['500'],
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: COLOR['200'],
  };

  const selectedCandiStyle = {
    //outline: '2px solid ' + COLOR['500'],
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: COLOR['100'],
  };
  
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isTablet = useMediaQuery({ maxWidth: 992 });


  return (
    <div
      style={{
        // backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 1) 40%), url('/grid-3d.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <HomeNav></HomeNav>
      
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          height: isTablet ? 600 : 800,
          width: '100%',
          // padding: isMobile ? '2rem 1rem' : '5rem 0',
          backgroundColor: 'rgba(255, 255, 255, 0.85)'

        }}
      >

        <Container>
          <Row style={{ alignItems: 'center' }}>
            <Col lg={12}>
              <Title
                style={{
                  fontSize: isMobile ? 36 : 40,
                  fontWeight: 900,
                  margin: '1.5rem 0',
                }}
              >
                <span className="text-highlight">Engage</span>.<span className="text-highlight">Secure</span>.{' '}
                <span className="text-highlight">Achieve</span>
                <br /><br/>
                <Text
                  style={{fontSize: 20, fontWeight: 500, color: COLOR['700']}}
                >
                Experience seamless, secure, and efficient online testing with Testify. Our platform is designed to make exams easy for both students and administrators. Join the future of education with cutting-edge features and unparalleled reliability.
                </Text>
              </Title>
              <Flex
                gap="middle"
                vertical={isMobile}
                style={{ marginTop: '1.5rem', marginLeft:'1.5rem' }}
              >
                <Link to={PATH_AUTH.signup}>
                  <Button
                    icon={<LoginOutlined />}
                    type="primary"
                    size="large"
                    block={isMobile}
                  >
                    Get Started
                  </Button>
                </Link>
              </Flex>
            </Col>
            {!isTablet && (
              
              <Col lg={12}>
                <Image src={assets.hero} alt="dashboard image snippet" preview={false}/>
              </Col>
              
            )}
          </Row>
        </Container>
      </Flex>
      {/* <Container style={sectionStyles}>
        <Title
          level={2}
          className="text-center"
          style={{color:COLOR['500'] }}
        >
          Elevate Your Exam Experience
        </Title>
      </Container> */}
      {/* <Container style={sectionStyles}>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {APPS.map((app) => (
            <Col key={app.title} xs={24} sm={12} lg={8} xl={6}>
              <Link to={app.link}>
                <Card hoverable cover={<img src={app.image} alt={app.title} />}>
                  <Text className="m-0 text-capitalize">{app.title}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container> */}
      <Container>
        <Title
          level={2}
          className="text-center"
          style={{ marginBottom: '2rem', color:COLOR['500'] }}
        >
          Elevate Your Exam Experience
        </Title>
        
        <Row>
          <Col lg={24}>
          <Flex align='center' justify='space-around'>
            <Typography.Title level={3} style={{color:COLOR['50'], cursor:'pointer', ...(showOrgFeatures ? selectedOrgStyle: {})}} onClick={()=>setShowOrgFeatures(true)}>Are you an Organization ?</Typography.Title>
            <Typography.Title level={3} style={{color:COLOR['500'], cursor:'pointer', ...(!showOrgFeatures ? selectedCandiStyle: {})}} onClick={()=>setShowOrgFeatures(false)}>Are you a Candidate ?</Typography.Title>
          </Flex>
          </Col>
        </Row>
        
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {features.map((feature) => (
            <AnimatePresence>
            <Col key={feature.title} xs={24} md={12} lg={8}>
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
              <Card style={{ height: '100%', ...(showOrgFeatures ? selectedOrgStyle: selectedCandiStyle)}}>
                <Flex vertical style={{alignItems:'center'}}>
                  {createElement(feature.icon, {
                    style: { fontSize: 50, color: 'black' },
                  })}
                  <Title level={5} className="text-capitalize" style={{color:COLOR['600']}}>
                    {feature.title}
                  </Title>
                  <Text>{feature.description}</Text>
                </Flex>
              </Card>
              </motion.div>
            </Col>
            </AnimatePresence>
          ))}
        </Row>
      </Container>
      
      <Container>
        <Card style={{ border: 'none', padding: '20px', display: 'flex', alignItems: 'center'}}>
          <Flex>
            <Image
              src={assets.review}
              alt="Testify testimonial"
              style={{ width: '320px', height:'320px', objectFit: 'cover', borderRadius: '20px 0px 0px 20px' }}
              preview={false}
            />
            <div
              style={{
                backgroundColor: COLOR['50'],
                borderRadius: '0px 20px 20px 0px',
                padding: '20px',
                //marginLeft: '-150px',
                display:'flex',
                alignItems:'center',
                //border:'1px solid red'
              }}
            >
              
              <Text style={{fontSize: '16px'}}>
                <Title>"</Title>The ability to customize Testify according to our needs, has made our examination process much faster for candidates. The data also shows that a quicker application process leads to a higher number applications and a better completion rate. As a result we're seeing increased participating speed with clear improvements in the quality of hire.<Title>"</Title>
              </Text>
              
            </div>
          </Flex>
        </Card>
      </Container>

      <Container style={{marginBottom:'20px'}}>
        <Card style={{display:'flex', alignItems:'center'}}>
          <Flex>
            <div style={{flex:1, display:'flex',justifyContent:'center',flexDirection:'column'}} className='textContainer'>
              <Text>
              <Title level={3}>Ready to Transform Your Exam Experience?</Title>
              <br/>
              Join thousands of satisfied users who trust Testify for their online examinations. Sign up now and experience the future of testing!
              </Text>
              <br/>
            <div className='buttonContainer' style={{margin:'10px'}}>
              <Link to={PATH_AUTH.signup}><Button style={{margin:'5px'}} type='primary'>Get Started</Button></Link>
              <Button style={{margin:'5px'}} type='primary'>Schedule a Demo</Button>
            </div>
            </div>
            <div style={{flex:1}} className='imageContainer'>
              <Image src={assets.cta} preview={false} style={{width:'50%', display:'flex', justifyContent:'center'}}></Image>
            </div>
          </Flex>
        </Card>
      </Container>

      <FooterNav></FooterNav>
    </div>
  );
};
