import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {useNavigate} from 'react-router-dom';
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const Login = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
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