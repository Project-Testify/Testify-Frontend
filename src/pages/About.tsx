import { Typography, Row, Col, Button, Menu} from 'antd';
import { Container, Logo } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../constants';
import { Header } from 'antd/es/layout/layout';
import FooterNav from '../layouts/app/FooterNav';
import HomeNav from '../components/HomeNav';

const { Title, Paragraph} = Typography;

const menuItems = [
  { label: <Link to="/">Home</Link>, key: 'home' },
  { label: <Link to="/about">about</Link>, key: 'corporate' },
  { label: <Link to="/contact-us">contact us</Link>, key: 'profile' },
  { label: <Link to={PATH_AUTH.signin}><Button type='primary' style={{borderRadius:'50px'}}>Login</Button></Link>, key: 'login' },
];

export const About = () => {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (

    <>
    <HomeNav/>

    <Container>
    <Row justify="center" style={{ marginTop: '20px'}}>
      <Col>
        <Title
          level={3}
          style={{
            color: '#1890ff',
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        > ABOUT-US </Title>
      </Col>
    </Row>

    <Row justify="center" style={{ marginTop: '-5px'}}>
        <Col>
        <Title
            level={1}
            style={{
            color: 'black',
            fontSize: '30px',
            textAlign: 'center',
            fontWeight: 'bold'
            }}
        > Who We Are</Title>
        </Col>
    </Row>

    <Row justify="center" style={{ marginTop: '10px' }}>
        <Col span={12} >
          <Title level={2} style={{ color: 'black', fontWeight: 'bold',marginTop:'80px' }}>
            ABOUT US
          </Title>
          <Paragraph style={{marginRight:'40px', marginTop:'25px'}}>
          We are 3rd year undergraduate students at the University of Colombo School of Computing. This is our 3rd year group project idea.We are developing an advanced online exam platform to transform the way exams are conducted. Our goal is to create a secure, efficient, and engaging system accessible to all users. The platform will feature interactive question types like drag-and-drop and coding challenges, and include live video and chat support for immediate assistance during exams.
          </Paragraph>
          {showMore && (
            <Paragraph style={{marginRight:'40px'}}>
              Security is a priority, with features like browser lockdown and two-factor authentication to prevent cheating. AI technology will help grade written answers quickly and accurately, and check for plagiarism. Students will receive detailed feedback to help them improve.Our motivation stems from the challenges of traditional exam systems. We aim to build a reliable, inclusive, and engaging solution for students and educators worldwide. Our future vision includes integrating with existing learning management systems to enhance learning and assessment.
            </Paragraph>
          )}
          <Button type="primary" size="large" onClick={handleLearnMore}>
            {showMore ? 'Show Less' : 'Learn More'}
          </Button>
        </Col>
        <Col span={12} style={{marginTop:'-60px'}}>
          <img
            src="/aboutUs_image.png"
            alt="About Us Illustration"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

    </Container>

    <FooterNav></FooterNav>
    </>

    
  );

};