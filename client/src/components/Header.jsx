import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

const styles = {
  links: {
    color: 'black'
  }
}
  
  return (
    <nav className='nav'>
      <div className="ui container">
        <div className="navItems">
              <NavLink style={styles.links} className="header link item" to='/'>
                Code
              </NavLink>
              <NavLink style={styles.links} className="header item" to='/about'>
                About
              </NavLink>
              <NavLink style={styles.links} className="header item" to='/contact'>
                Contact
              </NavLink>
              {Auth.loggedIn() ? (
              <button onClick={logout}>
                Logout
              </button>
              ) : <button>
                Sign Up
            </button>}
        </div>
    </div>
    </nav>
  );
};

export default Header;
