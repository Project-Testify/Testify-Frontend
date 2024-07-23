import { Button, Flex, Typography } from 'antd';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import { PATH_ORG_ADMIN } from '../../constants/routes';

export const WelcomePage = () => {
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: '80vh' }}
    >
      <Logo color="black" />
      <Typography.Title className="m-0">Welcome to Testify</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        Lets start your journey with our secure and seamless online exams.
      </Typography.Text>
      <Link to={PATH_ORG_ADMIN.dashboard
      }>
        <Button type="primary" size="middle">
          Go to Dashboard
        </Button>
      </Link>
    </Flex>
  );
};
