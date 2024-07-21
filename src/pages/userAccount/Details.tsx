import { Button, Col, Row, Space} from "antd";

export const UserProfileDetailsPage = () => {

  return (
    <Row gutter={[16, 16]}>
    <Col
      xs={24}
      sm={12}
      md={8}
      style={{ borderRight: '2px solid red', paddingRight: '16px' }}
    >
      <Space direction="vertical" size="large">
        <Button type="primary">Responsive Button 1</Button>
        <Button>Responsive Button 2</Button>
        <Button type="dashed">Responsive Button 3</Button>
      </Space>
    </Col>
    <Col
      xs={24}
      sm={12}
      md={8}
      style={{ borderRight: '2px solid red', paddingRight: '16px' }}
    >
      <Space direction="vertical" size="large">
        <Button type="primary">Responsive Button 4</Button>
        <Button>Responsive Button 5</Button>
        <Button type="dashed">Responsive Button 6</Button>
      </Space>
    </Col>
    <Col
      xs={24}
      sm={12}
      md={8}
      style={{ paddingRight: '16px' }}
    >
      <Space direction="vertical" size="large">
        <Button type="primary">Responsive Button 7</Button>
        <Button>Responsive Button 8</Button>
        <Button type="dashed">Responsive Button 9</Button>
      </Space>
    </Col>
  </Row>
  );
};
