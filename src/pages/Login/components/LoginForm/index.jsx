import React, { useState, useContext } from 'react';
import styles from '../../LoginPage.module.sass';
import { AuthContext } from '../../../../providers/AuthProvider';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
