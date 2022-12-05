// import React, { Component } from 'react'
// import { Menu } from 'semantic-ui-react'

// const colors = [
//   'black',
// ]

// class ExampleMenu extends Component {
//   state = { activeItem: 'home' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { color } = this.props
//     const { activeItem } = this.state

//     return (
//       <Menu color={'black'} inverted widths={4}>
//         <Menu.Item
//           name='code'
//           active={activeItem === 'code'}
//           onClick={this.handleItemClick}
          
//         />
//         <Menu.Item
//           name='about'
//           active={activeItem === 'about'}
//           onClick={this.handleItemClick}
//         />
//         <Menu.Item
//           name='contact'
//           active={activeItem === 'contact'}
//           onClick={this.handleItemClick}
//         />
//         <Menu.Item
//           name='logout'
//           active={activeItem === 'logout'}
//           onClick={this.handleItemClick}
//         />
//       </Menu>
//     )
//   }
// }

// const Header = () => {
//   const menus = colors.map((color) => <ExampleMenu color={color} key={color} />)

//   return <div>{menus}</div>
// }

// export default Header

// import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom';
// import { Menu } from 'semantic-ui-react'

// export default class MenuExampleBasic extends Component {
//   state = {}

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <Menu>
//         <Menu.Item
//           name='code'
//           active={activeItem === 'code'}
//           onClick={this.handleItemClick}
//         >
//           <NavLink to='/'>
//             Code
//           </NavLink>
//         </Menu.Item>

//         <Menu.Item
//           name='about'
//           active={activeItem === 'about'}
//           onClick={this.handleItemClick}
//         >
//           <NavLink to='/about'>
//             About
//           </NavLink>
//         </Menu.Item>

//         <Menu.Item
//           name='contact'
//           active={activeItem === 'contact'}
//           onClick={this.handleItemClick}
//         >
//           <NavLink to='/contact'>
//             Contact
//           </NavLink>
//         </Menu.Item>
//         <Menu.Item
//           name='logout'
//           active={activeItem === 'logout'}
//           onClick={this.handleItemClick}
//         >
//           <NavLink to='/login'>
//             Logout
//           </NavLink>
//         </Menu.Item>
//       </Menu>
//     )
//   }
// }


import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

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
