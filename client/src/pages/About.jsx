import { Layout } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';

const { Header, Footer, Sider, Content } = Layout;



const About = () => {

  return (
    <main>
        <Layout>
        <Content style={{
        minHeight: '100vh',
      }}>
        About
        </Content>
        <SiteFooter />
        </Layout>
    </main>
  );
};

export default About;
