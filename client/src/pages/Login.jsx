import React from 'react';
import LoginForm from '../components/LoginForm';
import { Layout } from 'antd';
import SiteFooter from '../components/Footer';
import WTFcode from'../assets/wtf-code.png';

const { Content } = Layout;

const Login = () => {

  return (
    <main>
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <img  id='login_logo' src={WTFcode} alt='WTFcode logo'/>
          <LoginForm style={{ paddingLeft: '200px' }}/>
        </Content>
        <SiteFooter />
      </Layout>
    </main>
  );
};

export default Login;