import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';
import { Layout } from 'antd';
import SiteFooter from '../components/Footer';

// TODO: What other content do we want here?

const { Content } = Layout;

const Login = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
          <Content >
            <LoginForm />
            <SignupForm />
          </Content>
            <SiteFooter />
        </Layout>
    </main>
  );
};

export default Login;