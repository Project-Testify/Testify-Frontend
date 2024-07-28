import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '../constants';
import { Header } from 'antd/es/layout/layout';
import { Logo } from './Logo/Logo';


const HomeNav = () => {
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: 'home' },
    { label: <Link to="#">about</Link>, key: 'corporate' },
    { label: <Link to="#">contact us</Link>, key: 'profile' },
    { label: <Link to={PATH_AUTH.signin}><Button type='primary' style={{borderRadius:'50px'}}>Login</Button></Link>, key: 'login' },
  ];
  
  return (
      <Header style={{ display: 'flex',flexDirection:'row', backgroundColor:'white', alignItems:'center'}}>
        <div className='logo' style={{marginRight:'auto'}}>
          <Logo color='black'/>
        </div>
        <Menu mode='horizontal' items={menuItems} style={{flex:'1', justifyContent:'flex-end', fontSize:'16px'}}/>
      </Header>
  )
}

export default HomeNav;