import { Typography, Row, Col, Form, Input, Button } from 'antd';
import { Container} from '../components';
import HeaderNav from '../../src/layouts/app/HeaderNav';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const ContactUs = () => {
  return (
    <>
    
    <HeaderNav />
    <Container>
    <Row justify="center" style={{ marginTop: '-35px'}}>
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
        > Get In Touch</Title>
        </Col>
    </Row>

    <Row justify="center" style={{ marginTop: '20px'}}>
        <Col span={10} style={{ marginTop: '15px'}}>
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
        <Col span={10} offset={2} style={{marginTop:'40px'}}>
          <Form layout="vertical">
            <Form.Item label="Your name" style={{fontWeight:'bold'}}>
              <Input placeholder="Jananga Wijewardhana" style={{ backgroundColor: '#EBECFE', width: '500px' }}/>
            </Form.Item>
            <Form.Item label="Email" style={{fontWeight:'bold'}}>
              <Input placeholder="Enter a valid email address" style={{ backgroundColor: '#EBECFE', width: '500px' }}/>
            </Form.Item>
            <Form.Item label="Phone Number" style={{fontWeight:'bold'}}>
              <Input placeholder="011-5869743" style={{ backgroundColor: '#EBECFE', width: '500px' }}/>
            </Form.Item>
            <Form.Item label="Write your message here" style={{fontWeight:'bold'}}>
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

    </>
    
  );
};

