import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { LOGIN } from '../queries';

const Login = ({ show, setError, handleLogin }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      handleLogin(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const { username, password } = Object.fromEntries(formData.entries());

    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User</label>
      <input name="username"></input>
      <label>Password</label>
      <input name="password" type="password"></input>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
