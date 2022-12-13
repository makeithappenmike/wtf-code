import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { Form, Input, Button } from 'antd';
import Auth from '../utils/auth';

// TODO: Handle form validation
// TODO: Add signup button
// TODO: Handle errors and adjust current error handling
// TODO: Handle duplicate signups

const Signup = (props) => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
  const { name, value } = event.target;
  
  // Update and set formstate
  setFormState({
      ...formState,
      [name]: value,
    });
  };

  // On form submit, attempt signup
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
      Auth.login(data.createUser.token);
      alert('Woohoo! Signup successful!\nLogging you in..');
    } catch (e) {
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
        <div className="card">
          <h2>Signup</h2>
            {data ? (
              <p>
                Success!
              </p>
            ) : (
              <Form>
                <Input className="form-input" placeholder="Your name" name="username" type="name" value={formState.username} onChange={handleChange} id='signup_name' />
                <Input className="form-input" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} id='signup_email' />
                <Input className="form-input" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} id='signup_password' />
                <Button id='signup' onClick={handleFormSubmit} >
                  Signup
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

export default Signup;