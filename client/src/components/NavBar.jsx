import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Layout, Menu, Col, Row, Button } from 'antd';

const { Header } = Layout;

const navItems = [
  {
    path: '/home',
    label: 'Code',
  },
  {
    path: '/about',
    label: 'About',
  },
  {
    path: '/contact',
    label: 'Contact',
  },
].map((item, index) => {
  return {
    key: index,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: item.icon,
  };
});

const NavBar = () => {

  // Handle logout
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Inline Menu styling
  const centerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'end'
  };
  
  return (
    <>
    <Layout>
      
      {/* Only show the header if the User is logged in */}
      {Auth.loggedIn() ? (
      <Header className='header' >
      <Row wrap={false}>
        <Col flex='auto' >
          <>
          <Menu theme='dark' style={centerStyle} mode='horizontal' defaultSelectedKeys={['0']} items={navItems} />
          </>
        </Col>
        <Col justify='end'>
      <Button id='logoutButton' type='link' style={{ border: '1px solid #2e3541'  }} onClick={logout}>Logout</Button>
      </Col>
      </Row>
      </Header>
      ) : <></>}
    </Layout>
    </>
  );
};

export default NavBar;
