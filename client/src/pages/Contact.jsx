import React, { useState } from 'react';
import { Layout, Form, Input, Button, notification, Spin } from 'antd';
import SiteFooter from '../components/Footer';
import WTFCode from'../assets/wtf-code.png';
import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { CONTACT } from '../../src/utils/mutations';

const { Content } = Layout;
const { TextArea } = Input;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Contact = () => {

  const [contactState, setContactState] = useState({ email: '', name: '', message: '' });
  const [contact, {loading}] = useMutation(CONTACT);

  // Handle notifications
  const openNotification = (title, message) => {
    notification.open({
      message: title,
      description: message,
    });
  };

  // Update state based on form input changes
  const handleChange = (event) => {
  const { name, value } = event.target;
  
  // Update and set formstate
  setContactState({
      ...contactState,
      [name]: value,
    });
  };

  // On form submit, send message
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await contact({
        variables: { ...contactState },
      });
      openNotification('Your message has been sent! Thanks for reaching out.');
    } catch (e) {
      openNotification('There was a problem sending your message.');
    }

    // Clear form values
    setContactState({
      email: '',
      name: '',
      message: '',
    });

  };

  return (
    <main className='flex-row justify-center'>
      <section className='col-12 col-lg-10'>
        <section className='card' style={{ width: 'calc(50%)', margin: 'auto' }}>
          <Layout style={{ minHeight: '100vh' }}>
            <Content>
              <section>
                <img  id='about_logo' src={WTFCode} alt='WTF Code Logo'/>
                <section>
                  <h2>Contact</h2>
                  <Form>
                    <Input className='form-input' placeholder='Your email' name='email' type='email' value={contactState.email} onChange={handleChange} id='submit_email' />
                    <Input className='form-input' placeholder='Your name' name='name' type='name' value={contactState.name} onChange={handleChange} id='submit_name' />
                    <br />
                    <TextArea id='message' name='message' rows={4} placeholder='Message' maxLength={600} value={contactState.message} onChange={handleChange} />
                    <Button id='submit_message' onClick={handleMessageSubmit} >Submit</Button>
                    <Spin spinning={loading} indicator={loadingIcon} style={{ paddingLeft: '5px' }}></Spin>
                  </Form>
                </section>
              </section>
            </Content>
            <SiteFooter />
          </Layout>
        </section>
      </section>
    </main>
  );
};

export default Contact;