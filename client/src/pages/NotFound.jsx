import { Layout, Button } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';
import WTFCode404 from'../assets/WTF-Code-Page-Not-Found.png';

const { Content } = Layout;

const handleHomeClick = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  window.location.assign('/home')
};

const NotFound = () => {

  return (
    <main>
      <Layout style={{ minHeight: '100vh' }}>
        <Content >
          <img  id='notfound_logo' src={WTFCode404} alt='404 Page Not Found'/>
          <h1 style={{ textAlign: 'center'}}>Uh Oh!</h1>
          <p style={{ textAlign: 'center'}}>We can't find the page you were looking for.. try again or head back to the home page.
          <p />
          <Button id='home_button' htmlType='button' onClick={handleHomeClick}>Home</Button></p>
        </Content>
        <SiteFooter />
      </Layout>
    </main>
  );

};

export default NotFound;