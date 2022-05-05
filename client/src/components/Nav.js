import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logUserOut } from '../reducers/userReducer';

const padding = {
  padding: 3,
};

const navStyle = {
  padding: 3,
  backgroundColor: 'pink',
};

const Nav = ({ currentUser }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logUserOut());
  };

  return (
    <div style={navStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <span style={padding}><b> {currentUser.name} is logged in.</b></span>
      <button style={padding} onClick={handleLogout} type="button">
        logout
      </button>
    </div>
  );
};

export default Nav;