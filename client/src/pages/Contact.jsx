import { Layout } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';

const { Header, Footer, Sider, Content } = Layout;



const Contact = () => {

  return (
    <main>
        <Layout>
        <Content style={{
        minHeight: '100vh',
      }}>
        Contact
        </Content>
        <SiteFooter />
        </Layout>
    </main>
  );
};

export default Contact;