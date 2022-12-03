import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Header = () => {

  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";
  
  return (
    <nav>
      <div class="ui container">
        <div class="ui compact menu">
            <a class="header item">
              <NavLink to='/'>
                Code
              </NavLink>
            </a>
            <a class="header item">
              <NavLink to='/about'>
                About
              </NavLink>
            </a>
            <a class="header item">
              <NavLink to='/contact'>
                Contact
              </NavLink>
            </a>
            <a class="header item">
              <NavLink to='/login'>
                Logout
              </NavLink>
            </a>
        </div>
    </div>
    </nav>
  );
};

export default Header;
