import { Layout } from 'antd';

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }: FooterNavProps) => {
  return (
    <Footer {...others}>Testify © 2024 Created by Group 36</Footer>
  );
};

export default FooterNav;
