import { Typography, Row, Col, Button} from 'antd';
import { Container } from '../components';
import { useState } from 'react';
const { Title} = Typography;


const { Paragraph } = Typography;
export const About = () => {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

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
          <Title level={2} style={{ color: 'black', fontWeight: 'bold',marginTop:'80px' }}>
            ABOUT US
          </Title>
          <Paragraph style={{marginRight:'40px', marginTop:'25px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed mauris commodo erat rutrum tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla odio sed vehicula. printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the.
          </Paragraph>
          {showMore && (
            <Paragraph style={{marginRight:'40px'}}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </Paragraph>
          )}
          <Button type="primary" size="large" onClick={handleLearnMore}>
            {showMore ? 'Show Less' : 'Learn More'}
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