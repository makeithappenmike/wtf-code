import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Input, Button } from 'antd';
import Auth from '../utils/auth';

// TODO: Handle form validation
// TODO: Add signup button
// TODO: Handle errors and adjust current error handling

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
  const { name, value } = event.target;
  
  // Update and set formstate
  setFormState({
      ...formState,
      [name]: value,
    });
  };

  // On form submit, attempt login
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      email: '',
      password: '',
    });

  };

  return (
    <main className="flex-row justify-center">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h2>Login</h2>
            {data ? (
              // TODO: Add loading here
              <></>
            ) : (
              <Form>
                <Input className="form-input" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} id='submit_email' />
                <Input className="form-input" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
                <Button id='submit_login' onClick={handleFormSubmit} >
                  Login
                </Button>
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

export default Login;