import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Input, Checkbox, Button } from 'antd';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    console.log('Logging in...');
    event.preventDefault();
    console.log(formState);
    // console.log("token", data.login.token);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      console.log(data);

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    
    <main className="flex-row justify-center">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h2>Login</h2>
          {/* <div className="card-body"> */}
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <Form>
                <Input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  id='submit_login'
                />
                <Input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button
                  // className="btn btn-block btn-info"
                  // style={{ cursor: 'pointer' }}
                  // type="submit"
                  id='submit_login'
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </Form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          {/* </div> */}
        </div>
      </div>
    </main>
  );
};

export default Login;