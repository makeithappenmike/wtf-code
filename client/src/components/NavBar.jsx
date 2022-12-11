import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Switch, Col, Divider, Row } from 'antd';
import WTFCode from'../assets/wtf-code.png';

const { Header, Content, Footer, Sider } = Layout;
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};
const items1 = [
  {
    path: "/",
    label: "",
    icon: <img  src={WTFCode} style={{ maxHeight: '30px', verticalAlign: 'middle'}} alt="WTFCode"/>,
  },
  {
    path: "/",
    label: "Code",
    // icon: <Icon type="fire" />,
  },
  {
    path: "/about",
    label: "About",
    // icon: <Icon type="fire" />,
  },
  {
    path: "/contact",
    label: "Contact",
    // icon: <Icon type="fire" />,
  },
  {
    path: "/login",
    label: "Logout",
    // icon: <Icon type="fire" />,
  }
].map((item, index) => {
  return {
    key: index,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: item.icon,
  };
});
// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });


const NavBar = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

const styles = {
  links: {
    color: 'black'
  }
}
  
  return (
    <>
    <Layout>
    {Auth.loggedIn() ? (
    <Header flex="auto" className="header" >
    <Row wrap={true}>
      <Col flex="auto">
        
        <>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
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
