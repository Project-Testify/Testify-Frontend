import { Button, Col, Flex, Image, Row, Typography, Menu } from 'antd';
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
import { Card, Container, Logo } from '../components';
import { createElement} from 'react';
import { Header } from 'antd/es/layout/layout';
import { COLOR } from '../App';
import FooterNav from '../layouts/app/FooterNav';


const { Title, Text } = Typography;


const FEATURES = [
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

const menuItems = [
  { label: <Link to="/">Home</Link>, key: 'home' },
  { label: <Link to="#">about</Link>, key: 'corporate' },
  { label: <Link to="#">contact us</Link>, key: 'profile' },
  { label: <Link to={PATH_AUTH.signin}><Button type='primary' style={{borderRadius:'50px'}}>Login</Button></Link>, key: 'login' },
];

export const HomePage = () => {
  // const {
  //   token: { colorPrimary },
  // } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isTablet = useMediaQuery({ maxWidth: 992 });

  // const sectionStyles: CSSProperties = {
  //   paddingTop: isMobile ? 40 : 80,
  //   paddingBottom: isMobile ? 40 : 80,
  //   paddingRight: isMobile ? '1rem' : 0,
  //   paddingLeft: isMobile ? '1rem' : 0,
  // };

  return (
    <div
      style={{
        // backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 1) 40%), url('/grid-3d.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Header style={{ display: 'flex',flexDirection:'row', backgroundColor:'white', alignItems:'center'}}>
        <div className='logo' style={{marginRight:'auto'}}>
          <Logo color='black'/>
        </div>
        <Menu mode='horizontal' items={menuItems} style={{flex:'1', justifyContent:'flex-end', fontSize:'16px'}}/>
      </Header>
      
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
                {/* A dynamic and versatile multipurpose{' '} */}
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
                <Image src="/hero.png" alt="dashboard image snippet" preview={false}/>
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
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {FEATURES.map((feature) => (
            <Col key={feature.title} xs={24} md={12} lg={8}>
              <Card style={{ height: '100%', backgroundColor:COLOR['50']}}>
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
            </Col>
          ))}
        </Row>
      </Container>
      {/* <Card
        style={{
          width: isMobile ? '95%' : 500,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Title level={4} style={{ marginTop: 0 }}>
          Haven't found an answer to your question?
        </Title>
        <Text style={{ marginTop: '1rem' }}>
          Connect with us either on discord or email us
        </Text>
        <Flex gap="middle" justify="center" style={{ marginTop: '1rem' }}>
          <Button href="mailto:kelvin.kiprop96@gmail.com" type="primary">
            Email
          </Button>
          <Button target="_blank" href={`${PATH_GITHUB.repo}/issues`}>
            Submit an issue
          </Button>
        </Flex>
      </Card> */}
      <Container>
        <Card style={{ border: 'none', padding: '20px', display: 'flex', alignItems: 'center'}}>
          <Flex>
            <Image
              src="/review.jpg"
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
              <Image src='/cta.jpg' preview={false} style={{width:'50%', display:'flex', justifyContent:'center'}}></Image>
            </div>
          </Flex>
        </Card>
      </Container>

      <FooterNav></FooterNav>
    </div>
  );
};
