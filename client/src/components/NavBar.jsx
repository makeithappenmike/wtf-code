import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Layout, Menu, theme, Switch, Col, Row } from 'antd';
import WTFCode from'../assets/wtf-code.png';

// TODO: Handle logout
// TODO: Move logo and logout out of navItems
// TODO: Design & update logo
// TODO: Fix mobile view -- toggle button currently disappears

const { Header } = Layout;
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};
const navItems = [
  {
    path: "/",
    label: "",
    icon: <img  src={WTFCode} style={{ maxHeight: '30px', verticalAlign: 'middle'}} alt="WTFCode"/>,
  },
  {
    path: "/",
    label: "Code",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/contact",
    label: "Contact",
  },
  {
    path: "/login",
    label: "Logout",
  }
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
  
  return (
    <>
    <Layout>
    {Auth.loggedIn() ? (
    <Header flex="auto" className="header" >
    <Row wrap={true}>
      <Col flex="auto">
        <>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={navItems} />
        </>
        </Col>
      <Col flex="100px">
    <Switch id='modeSwitch' size="medium" checkedChildren="light" unCheckedChildren="dark" onChange={onChange} />
    </Col>
    </Row>
    </Header>
    ) : <></>}
    </Layout>
    </>
  );
};

export default NavBar;
