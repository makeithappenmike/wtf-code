import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import WTFCode from'../assets/wtf-code.png';


const { Header, Content, Footer, Sider } = Layout;
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
  },
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
    
    <Header className="header">
        {/* <nav className='nav'>
          {Auth.loggedIn() ? (
          <div className="ui container">
            <div className="navItems">
                  <NavLink style={styles.links} className="header link item" to='/'>
                    Code
                  </NavLink>
                  <NavLink style={styles.links} className="header item" to='/about'>
                    About
                  </NavLink>
                  <NavLink style={styles.links} className="header item" to='/contact'>
                    Contact
                  </NavLink>
                  {Auth.loggedIn() ? (
                  <button onClick={logout}>
                    Logout
                  </button>
                  ) : <></>}
            </div>
        </div>
        ) : <></>}
        </nav> */}
        
        {/* <div className="logo" /> */}
        {Auth.loggedIn() ? (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        ) : <></>}
    </Header>
    </Layout>
    </>
  );
};

export default NavBar;
