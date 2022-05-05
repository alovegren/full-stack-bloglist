import React, { useState } from 'react';

import Button from '@mui/material/Button';

const Login = ({ logUserIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    logUserIn({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form id="login-form" onSubmit={handleLogin}>
      Login
      <div>
        username
        <input
          id="username-input"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        id="login-form-btn"
        type="submit"
        variant="contained"
        disableElevation
      >
        login
      </Button>
    </form>
  );
};

export default Login;