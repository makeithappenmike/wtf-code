import React from 'react';
import LoginForm from '../components/LoginForm';
import { Layout } from 'antd';
import SiteFooter from '../components/Footer';

const { Header, Footer, Sider, Content } = Layout;



const Login = () => {

  return (
    <main>
        <Layout>
        <Content style={{
        minHeight: '100vh',
      }}>
        <LoginForm />
        </Content>
        <SiteFooter />
        </Layout>
    </main>
  );
};

export default Login;