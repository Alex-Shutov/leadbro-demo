import React from 'react';
import styles from './LoginPage.module.sass';
import LoginForm from './components/LoginForm';
import Logo from '../../shared/Logo';

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
