import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Layout, Menu, theme, Switch, Col, Row, Button } from 'antd';
import WTFCode from'../assets/wtf-code.png';

// TODO: Handle logout
// TODO: Move logo and logout out of navItems
// TODO: Design & update logo
// TODO: Fix mobile view -- toggle button currently disappears

const { Header } = Layout;
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const handleLogOut = async (event) => {
  event.preventDefault();
  console.log(formState);
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
  // {
  //   path: "/login",
  //   label: "",
  //   icon: 
  // }
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
      <Button id='logoutButton' onClick={logout}>Logout</Button>
    </Col>
    </Row>
    </Header>
    ) : <></>}
    </Layout>
    </>
  );
};

export default NavBar;
