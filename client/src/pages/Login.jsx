import React, { useEffect, useState, useMutation } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {useNavigate} from 'react-router-dom';
import Auth from '../utitls/auth';

const Login = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  const [formState, setFormState] = useState({ email: '', password: '' });
  // const [login, { error, data }] = useMutation(LOGIN_USER);

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
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

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

  return (
    <main>
      <form className="ui form">
        <div className="field">
          <label>Email Address</label>
          <input type="text" name="email" placeholder="Email" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="text" name="password" placeholder="Password" />
        </div>
        <div className="field">
        </div>
        <button className="ui button" type="submit" onClick={handleClick}>Sign In</button>
      </form>
    </main>
  );
};

export default Login;