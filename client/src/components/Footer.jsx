import React, { useState } from 'react';
import Auth from '../utils/auth';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu, theme } from 'antd';
  const { Header, Content, Footer, Sider } = Layout;

const SiteFooter = () => {

const styles = {
  links: {
    color: 'black'
  }
}
  
  return (
    <Footer
          style={{
            textAlign: 'center',
          }}
        >
          WTF Code ©2022 Created by Michael Martens & Jon Shogren
        </Footer>
  );
};

export default SiteFooter;
