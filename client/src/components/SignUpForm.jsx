import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER, CREATE_SNIPPET } from '../utils/mutations';
import { Form, Input, Button, notification, Modal, Spin } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import Auth from '../utils/auth';

// TODO: Handle duplicate signups
// TODO: Finish cleaning this up after more testing
// TODO: Handle form reset after successful signup

// const openNotification = (title, message) => {
//   notification.open({
//     message: title,
//     description: message,
//   });
// };

const Signup = (props) => {

  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  const [createSnippet] = useMutation(CREATE_SNIPPET);
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
    const { name, value } = event.target;
    window.location.assign('/')
    };

  // On form submit, attempt signup
  const handleSignupClick = async (event) => {
    event.preventDefault();
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

    // Create example snippet when someone signs up
    try {
      const { data } = await createSnippet({
        variables: { code: "// Press the Submit button below to explain this code. \nfunction hello(input) {\n  if (typeof input === 'string') {\n    return input;\n  } else {\n    console.log('Please only use a string');\n}", name: 'Example Snippet', explanation: 'When you Submit your code, an explanation will show up here!\n\nYou can edit the explanation, give it a name below and then Save.\n\nTo remove a snippet, press the Delete button.'},
      });
      setRefetchSnippets(1);
    } catch (err) {
      // openNotification('There was a problem saving your snippet.');
    }

    // Clear form values
    setFormState({
      name: '',
      email: '',
      password: '',
    });

  };

  return (
    <main className='flex-row justify-center'>
      <section className='col-12 col-lg-10'>
        <section className='card' style={{ width: 'calc(50%)', margin: 'auto' }}>
          <h2>Signup</h2>
            {data ? (
              <>
              <Form>
                <Input className='form-input' placeholder='Your name' name='username' type='name' value={formState.username} onChange={handleChange} id='signup_name' />
                <Input className='form-input' placeholder='Your email' name='email' type='email' value={formState.email} onChange={handleChange} id='signup_email' />
                <Input className='form-input' placeholder='******' name='password' type='password' value={formState.password} onChange={handleChange} id='signup_password' />
                <Button type='link' id='submit_login' onClick={handleLoginClick} >Login</Button>
                <Button id='signup_button' onClick={handleSignupClick} >Signup</Button>
              </Form>
              </>
              ) : (
              <Form>
                <Input className='form-input' placeholder='Your name' name='username' type='name' value={formState.username} onChange={handleChange} id='signup_name' />
                <Input className='form-input' placeholder='Your email' name='email' type='email' value={formState.email} onChange={handleChange} id='signup_email' />
                <Input className='form-input' placeholder='******' name='password' type='password' value={formState.password} onChange={handleChange} id='signup_password' />
                <Button type='link' id='submit_login' onClick={handleLoginClick} >Login</Button>
                <Button id='signup_button' onClick={handleSignupClick} >Signup</Button>
                <Modal title='Share Snippet' centered open={modal2Open} onCancel={() => setModal2Open(false)} >
                  <p>Signup successful!<br />Logging you in now...</p>
                </Modal>
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

export default Signup;