import Link from 'next/link';
import React from 'react';
import Button from '../../components/button/button.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/ForgotPassword.module.scss';

const ForgotPassword = () => {
  return (
    <div className={styles.forgot_password_wrapper}>
      <div className={styles.forgot_password_form_wrapper}>
        <form className={styles.form_container}>
          <h5>Enter your registered email</h5>
          <FormInputText
            autoComplete="false"
            type="email"
            label="email"
            required={true}
          />

          <Button type="submit" width="100%">
            Get OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
