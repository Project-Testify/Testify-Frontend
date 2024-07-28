import { Typography, Row, Col, Form, Input, Button, Menu } from 'antd';
import { Container, Logo} from '../components';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../constants';
import { Header } from 'antd/es/layout/layout';
import FooterNav from '../layouts/app/FooterNav';

const { Title, Paragraph } = Typography;

const menuItems = [
  { label: <Link to="/">Home</Link>, key: 'home' },
  { label: <Link to="#">about</Link>, key: 'corporate' },
  { label: <Link to="#">contact us</Link>, key: 'profile' },
  { label: <Link to={PATH_AUTH.signin}><Button type='primary' style={{borderRadius:'50px'}}>Login</Button></Link>, key: 'login' },
];

export const ContactUs = () => {

  const handleSubmit = () => {
    return
  }


  return (
    <>
    
    <Header style={{ display: 'flex',flexDirection:'row', backgroundColor:'white', alignItems:'center'}}>
        <div className='logo' style={{marginRight:'auto'}}>
          <Logo color='black'/>
        </div>
        <Menu mode='horizontal' items={menuItems} style={{flex:'1', justifyContent:'flex-end', fontSize:'16px'}}/>
    </Header>

    <Container>
    <Row justify="center" style={{ marginTop: '-15px'}}>
      <Col>
        <Title
          level={3}
          style={{
            color: '#1890ff',
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        > CONTACT-US </Title>
      </Col>
    </Row>

    <Row justify="center" style={{ marginTop: '-10px'}}>
        <Col>
        <Title
            level={1}
            style={{
            color: 'black',
            fontSize: '30px',
            textAlign: 'center',
            fontWeight: 'bold'
            }}
        > Get In Touch</Title>
        </Col>
    </Row>

    <Row justify="center" style={{ marginTop: '20px'}}>
        <Col span={10} style={{ marginTop: '30px'}}>
          <Title level={4} style={{fontWeight:'bold'}}>Send us a message <MailOutlined style={{ color: '#1890ff', fontSize: '24px',marginBottom:'10px', marginLeft:'5px' }}/></Title>
          <Paragraph style={{ marginBottom:'25px' }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.
          </Paragraph>
          <Paragraph>
            <MailOutlined style={{ color: '#1890ff', fontSize: '24px' }}/> developer.testify@gmail.com
          </Paragraph>
          <Paragraph>
            <PhoneOutlined style={{ color: '#1890ff', fontSize: '24px' }}/> 0112 581 245
          </Paragraph>
          <Paragraph>
            <EnvironmentOutlined style={{ color: '#1890ff', fontSize: '24px' }}/> UCSC Building Complex, 35 Reid Ave, Colombo 00700
          </Paragraph>

          <Title level={4} style={{ fontWeight: 'bold',marginTop: '55px',marginBottom:'25px' }}>Follow us on social media</Title>
          <FacebookOutlined style={{ color: '#3b5998', fontSize: '40px', margin: '0 10px', cursor: 'pointer',marginLeft:'-3px' }} />
          <TwitterOutlined style={{ color: '#1DA1F2', fontSize: '40px', margin: '0 10px', cursor: 'pointer' }} />
          <InstagramOutlined style={{ color: '#C13584', fontSize: '40px', margin: '0 10px', cursor: 'pointer' }} />
          <LinkedinOutlined style={{ color: '#0077B5', fontSize: '40px', margin: '0 10px', cursor: 'pointer' }} />

        </Col>
        <Col span={10} offset={2} style={{marginTop:'40px', marginBottom:'20px'}}>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Your name" name="name" style={{ fontWeight: 'bold' }} rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input placeholder="Jananga Wijewardhana" style={{ backgroundColor: '#EBECFE', width: '500px' }}/>
            </Form.Item>
            <Form.Item label="Email" name="email" style={{ fontWeight: 'bold' }} rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}>
              <Input placeholder="Enter a valid email address" style={{ backgroundColor: '#EBECFE', width: '500px' }}/>
            </Form.Item>
            <Form.Item label="Phone Number" name="phone" style={{ fontWeight: 'bold' }} rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input placeholder="011-5869743" style={{ backgroundColor: '#EBECFE', width: '500px' }}/>
            </Form.Item>
            <Form.Item label="Write your message here" name="message" style={{ fontWeight: 'bold' }} rules={[{ required: true, message: 'Please enter your message' }]}>
              <Input.TextArea placeholder="test message" style={{ backgroundColor: '#EBECFE', height: '100px', width: '500px' }}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit now
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </Container>

      <FooterNav></FooterNav>

    </>
    
  );
};

