import React from 'react';
import 'semantic-ui-css/semantic.min.css'

const Login = () => {

  return (
    <main>
      <form class="ui form">
        <div class="field">
          <label>Email Address</label>
          <input type="text" name="email" placeholder="Email" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="text" name="password" placeholder="Password" />
        </div>
        <div class="field">
        </div>
        <button class="ui button" type="submit">Sign In</button>
      </form>
    </main>
  );
};

export default Login;