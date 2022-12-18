import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Layout, Menu, Col, Row, Button } from 'antd';
import WTFCode from'../assets/wtf-code.png';

// TODO: Move logo and logout out of navItems
// TODO: Design & update logo
// TODO: Fix mobile view -- toggle button currently disappears

const { Header } = Layout;
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const handleLogOut = async (event) => {
  event.preventDefault();
  try {
    const { data } = await createUser({
      variables: { ...formState },
    });
    Auth.login(data.createUser.token);
    alert('Woohoo! Signup successful!\nLogging you in..');
  } catch (e) {
    console.error(e);
  }

  // Clear form values
  setFormState({
    name: '',
    email: '',
    password: '',
  });

};

const navItems = [
  // {
  //   path: "/home",
  //   label: "",
  //   icon: <img  src={WTFCode} style={{ maxHeight: '50px', verticalAlign: 'middle'}} alt="WTFCode"/>,
  // },
  {
    path: "/home",
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

  const centerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'end'
  };
  
  return (
    <>
    <Layout>
    {Auth.loggedIn() ? (
    <Header className="header" >
    <Row wrap={false}>
      <Col flex="auto" >
        <>
        <Menu theme="dark" style={centerStyle} mode="horizontal" defaultSelectedKeys={['0']} items={navItems} />
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
