import { Typography, Row, Col, Button} from 'antd';
import { Container } from '../components';
const { Title} = Typography;


const { Paragraph } = Typography;
export const About = () => {
  

  return (

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
          <Title level={2} style={{ color: 'black', fontWeight: 'bold',marginTop:'70px' }}>
            ABOUT US
          </Title>
          <Paragraph style={{marginRight:'40px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed mauris commodo erat rutrum tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla odio sed vehicula. printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the.
          </Paragraph>
          <Button type="primary" size="large">
            Learn More
          </Button>
        </Col>
        <Col span={12} style={{marginTop:'-50px'}}>
          <img
            src="/aboutUs_image.png"
            alt="About Us Illustration"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

    </Container>

    
  );

};