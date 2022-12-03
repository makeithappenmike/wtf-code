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
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Code
          </NavLink>
        </li>
        <li>
          <NavLink to="about">
            {({ isActive }) => (
              <span
                className={
                  isActive ? activeClassName : undefined
                }
              >
                About
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="contact">
            {({ isActive }) => (
              <span
                className={
                  isActive ? activeClassName : undefined
                }
              >
                Contact
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
