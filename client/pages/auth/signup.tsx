import React from 'react';
import Button from '../../components/button/button.component';
import Link from 'next/link';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/Signup.module.scss';

const Signup = () => {
  return (
    <div className={styles.signup_wrapper}>
      <div className={styles.signup_form_wrapper}>
        <form className={styles.form_container}>
          <h4>Signup form</h4>
          <FormInputText
            autoComplete="false"
            type="text"
            label="name"
            placeholder="Tom Hanks"
            required={true}
          />
          <FormInputText
            autoComplete="false"
            type="email"
            label="email"
            placeholder="tom@example.com"
            required={true}
          />
          <FormInputText
            autoComplete="false"
            type="password"
            label="password"
            required={true}
          />
          <p className={styles.signin_description}>
            Already have an account?{' '}
            <Link className={styles.signin_page_link} href="/auth/signin">
              Sign In
            </Link>
          </p>
          <Button type="submit" width="100%">
            sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
