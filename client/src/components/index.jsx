import React from 'react';
// import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import LoginForm from './LoginForm';


const Login = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <main>
        <LoginForm />
    </main>
  );
};

export default Login;
