import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Input, Button, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Auth from '../utils/auth';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Notification modal
const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
  });
};

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loading, error, data }] = useMutation(LOGIN_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
  const { name, value } = event.target;
  
  // Update and set formstate
  setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Signup click (swtiched to /signup page)
  const handleSignupClick = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    window.location.assign('/signup')
    };

  // On form submit, attempt login
  const handleLoginClick = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      openNotification('Uh oh! Incorrect credentials...');
    }

    // Clear form values
    setFormState({
      email: '',
      password: '',
    });

  };

  return (
    <main className='flex-row justify-center'>
      <section className='col-12 col-lg-10'>
        <section className='card' style={{ width: 'calc(50%)', margin: 'auto' }}>
          <h2>Login</h2>
            {data ? (
              // TODO: Add loading here
              <></>
              ) : (
              <Form>
                <Input className='form-input' placeholder='Your email' name='email' type='email' value={formState.email} onChange={handleChange} id='submit_email' />
                <Input className='form-input' placeholder='******' name='password' type='password' value={formState.password} onChange={handleChange} />
                <Button id='submit_login' onClick={handleLoginClick} >
                  Login
                </Button>
                <Button type='link' id='submit_signup' htmlType='button' onClick={handleSignupClick}>
                  Signup
                </Button>
                <Spin spinning={loading} indicator={loadingIcon} style={{ paddingLeft: '5px' }}></Spin>
              </Form>
              )}
              {error && (
              <section className='my-3 p-3 bg-danger text-white'>
                {error.message}
              </section>
            )}
        </section>
      </section>
    </main>
  );
};

export default Login;