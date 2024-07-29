import { Layout, Row, Col, Divider, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Logo } from '../../components';
import { PATH_HOME } from '../../constants/routes.ts';
import { Scheduled } from '../../../template/src/components/dashboard/shared/PostsCard/PostsCard.stories';
import { Link } from 'react-router-dom';

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
          <Row style={{}}>
            <Col
              span={7}
              style={{
                textAlign: 'end',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Link to={'/about'}>
                {' '}
                <Typography.Text>About</Typography.Text>
              </Link>
              <Link to={'/'}>
                {' '}
                <Typography.Text>Contact us</Typography.Text>
              </Link>
              <Link to={'/'}>
                {' '}
                <Typography.Text>Schedule a demo</Typography.Text>
              </Link>
              <Link to={'/auth/signin'}>
                {' '}
                <Typography.Text>Login</Typography.Text>
              </Link>
            </Col>

            <Col
              span={7}
              style={{
                textAlign: 'end',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex',
              }}
            >
              <Link to={'/about'}>
                {' '}
                <Typography.Text>About</Typography.Text>
              </Link>
              <Link to={'/'}>
                {' '}
                <Typography.Text>Contact us</Typography.Text>
              </Link>
              <Link to={'/'}>
                {' '}
                <Typography.Text>Schedule a demo</Typography.Text>
              </Link>
              <Link to={'/auth/signin'}>
                {' '}
                <Typography.Text>Login</Typography.Text>
              </Link>
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
        Testify © 2024 Created by Group 36
      </Row>
    </Footer>
  );
};

export default FooterNav;
