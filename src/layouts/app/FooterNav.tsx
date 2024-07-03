import { Layout, Row, Col, Divider } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Logo } from '../../components';
import { PATH_HOME, PATH_ORG_ADMIN } from '../../constants/routes.ts';

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }: FooterNavProps) => {
  const isMobile = useMediaQuery({ maxWidth: 769 });

  return (
    <Footer {...others}>
      <Row
        style={{ minHeight: isMobile ? 'auto' : '80px', overflow: 'hidden' }}
      >
        <Col span={10} style={{ textAlign: 'center' }}>
          <Logo
            color="black"
            asLink
            href={PATH_HOME.root}
            justify="center"
            gap="small"
            imgSize={{ h: 35, w: 35 }}
            style={{ padding: '1rem 0' }}
          />
        </Col>
        <Col span={14} style={{ textAlign: 'center' }}>
          <Row>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Row>Help center</Row>
              <Row>informations</Row>
              <Row>Sitemap</Row>
              <Row>Legal stuff</Row>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Row>Careers</Row>
              <Row>Blog</Row>
              <Row>Privacy policy</Row>
              <Row>Contact</Row>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Row>Careers</Row>
              <Row>Blog</Row>
              <Row>Privacy policy</Row>
              <Row>Contact</Row>
            </Col>
          </Row>
        </Col>

        <Divider style={{ margin: '20px 0', borderColor: '#CCCCCC' }} />
      </Row>
      <Row
        style={{ minHeight: isMobile ? 'auto' : '30px', overflow: 'hidden' }}
        justify="center"
        align="middle"
      >
        AntD Dashboard © 2023 Created by Design Sparx
      </Row>
    </Footer>
  );
};

export default FooterNav;
