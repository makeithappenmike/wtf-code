import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { Form, Input, Button, notification, Modal, Spin } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import Auth from '../utils/auth';

// TODO: Handle form validation
// TODO: Add signup button
// TODO: Handle errors and adjust current error handling
// TODO: Handle duplicate signups

// const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
  });
};

const Signup = (props) => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  const [modal2Open, setModal2Open] = useState(false);  

  // Update state based on form input changes
  const handleChange = (event) => {
  const { name, value } = event.target;
  
  // Update and set formstate
  setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    console.log('click');
    const { name, value } = event.target;
    window.location.assign('/')
    };

  // On form submit, attempt signup
  const handleSignupClick = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
      setModal2Open(true);
      Auth.login(data.createUser.token);
    } catch (e) {
      // openNotification('Uh oh! There was a problem signing up.');
      console.error(e);
    }

    // Clear form values
    setFormState({
      name: '',
      email: '',
      password: '',
    });

  };

  return (
    <main className="flex-row justify-center">
      <div className="col-12 col-lg-10">
        <div className="card" style={{ width: 'calc(50%)', margin: 'auto' }}>
          <h2>Signup</h2>
            {data ? (
              <>
              <Form>
                <Input className="form-input" placeholder="Your name" name="username" type="name" value={formState.username} onChange={handleChange} id='signup_name' />
                <Input className="form-input" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} id='signup_email' />
                <Input className="form-input" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} id='signup_password' />
                <Button type="link" id='submit_login' onClick={handleLoginClick} >
                  Login
                </Button>
                <Button id='signup_button' onClick={handleSignupClick} >
                  Signup
                </Button>
                <Modal
                  title="Uh oh!"
                  centered
                  open={modal2Open}
                  onCancel={() => setModal2Open(false)}
                  footer={
                    <Button key="ok" type="primary" onClick={() => setModal2Open(false)}>
                      Ok
                    </Button>}
                >
                  <p><WarningTwoTone /> Looks like there was an issue signing up.<br />Please try again...</p>
                </Modal>
              </Form>
              </>
            ) : (
              <Form>
                <Input className="form-input" placeholder="Your name" name="username" type="name" value={formState.username} onChange={handleChange} id='signup_name' />
                <Input className="form-input" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} id='signup_email' />
                <Input className="form-input" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} id='signup_password' />
                <Button type="link" id='submit_login' onClick={handleLoginClick} >
                  Login
                </Button>
                <Button id='signup_button' onClick={handleSignupClick} >
                  Signup
                </Button>
                <Modal
                  title="Share Snippet"
                  centered
                  open={modal2Open}
                  // onOk={handleShare}
                  onCancel={() => setModal2Open(false)}
                >
                  <p>Woohoo! Signup successful!<br />Logging you in now...</p>
                </Modal>
              </Form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default Signup;