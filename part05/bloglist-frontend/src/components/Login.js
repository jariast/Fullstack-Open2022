import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  submitHandler,
  newUsername,
  newUsernameHandler,
  newPassword,
  newPasswordHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <h1>Please login</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={newUsername}
          onChange={newUsernameHandler}
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={newPasswordHandler}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

Login.prototype = {
  submitHandler: PropTypes.func.isRequired,
  newUsername: PropTypes.string.isRequired,
  newUsernameHandler: PropTypes.func.isRequired,
  newPassword: PropTypes.string.isRequired,
  newPasswordHandler: PropTypes.func.isRequired,
};

export default Login;
