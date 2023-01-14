import React from 'react';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/Signin.module.scss';
import Link from 'next/link';
import Button from '../../components/button/button.component';

const Signin = () => {
  return (
    <div className={styles.signin_wrapper}>
      <div className={styles.signin_form_wrapper}>
        <form className={styles.form_container}>
          <h4>Signin form</h4>
          <FormInputText
            autoComplete="false"
            type="email"
            label="email"
            required={true}
          />
          <FormInputText
            autoComplete="false"
            type="password"
            label="password"
            required={true}
          />
          <Link
            href="/auth/forgot-password"
            className={styles.forgotten_password_page_link}
          >
            Forgotten Password?
          </Link>
          <Button type="submit" width="100%">
            sign in
          </Button>
          <p className={styles.signup_description}>
            Don't have an account?{' '}
            <Link className={styles.signup_page_link} href="/auth/signup">
              Create One
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
