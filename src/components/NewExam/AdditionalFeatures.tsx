import { Row, Col, Form, Switch, Typography, Button, Divider } from 'antd';

export const AdditionalFeatures = () => {
  return (
    <Form onFinish={() => console.log('Submitted')}>
      <Row>
        <Col sm={12}>
          <Typography.Title level={5}>Camera Access</Typography.Title>
        </Col>
        <Col sm={12}>
          <Form.Item name="cameraAccess">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};
