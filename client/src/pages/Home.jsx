import React, { useState } from 'react';
import Editor from '../components/Editor';
import Sidebar from '../components/Sidebar';
import SiteFooter from '../components/Footer';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <main>
      <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Editor />
        </Content>
        <SiteFooter />
      </Layout>
    </Layout>
    </main>
  );
};

export default Home;