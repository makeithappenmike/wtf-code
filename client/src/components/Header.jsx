import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";
  
  return (
    <nav className='nav'>
      <div className="ui container">
        <div className="navItems">
            <a className="header link item">
              <NavLink to='/'>
                Code
              </NavLink>
            </a>
            <a className="header item">
              <NavLink to='/about'>
                About
              </NavLink>
            </a>
            <a className="header item">
              <NavLink to='/contact'>
                Contact
              </NavLink>
            </a>
            <a className="header item">
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
