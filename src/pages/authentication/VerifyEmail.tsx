import { Button, Flex, Typography } from 'antd';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_AUTH } from '../../constants';



export const VerifyEmailPage = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: '80vh' }}
    >
      <Logo color="black" />
      <Typography.Title className="m-0">Verify Your Email</Typography.Title>
      <Typography.Text>
        We have sent an email to{' '}
        <Link to="mailto:{email}" >
          {email}
          
        </Link>{' '}
        plase follow a link to verify your email.
      </Typography.Text>
      <Link to={PATH_AUTH.signin}>
        <Button>Skip</Button>
      </Link>
      <Flex gap={2}>
        <Typography.Text>Did’t receive an email?</Typography.Text>
        <Typography.Link>Resend</Typography.Link>
      </Flex>
    </Flex>
  );
};
