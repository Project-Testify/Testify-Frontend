import {  Flex, Typography } from 'antd';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';

export const AccountDeactivePage = () => {
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: '80vh' }}
    >
      <Logo color="black" />
      <Typography.Title className="m-0">Deactivated Account</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        Looking for answers? Check the <Link to="#">Help Center</Link>.
      </Typography.Text>
      {/* <Link to={PATH_DASHBOARD.default}>
        <Button type="primary" size="middle">
          Go to Homepage
        </Button>
      </Link> */}
    </Flex>
  );
};
