import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import Button from '../../components/button/button.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/ForgotPassword.module.scss';
import { validateEmail } from '../../util/validation/auth';
import { BACKEND_URL } from '../_app';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailValidationError, setEmailValidationError] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailValidationError(true);
      return;
    }
    setEmailValidationError(false);
  };
  const { doRequest: getOTPRequest, errors: getOTPRequestErrors } = useRequest({
    url: `${BACKEND_URL}/auth/forgotpassword`,
    method: 'post',
    body: { email },
    onSuccess: () => {},
  });

  return (
    <div className={styles.forgot_password_wrapper}>
      <div className={styles.forgot_password_form_wrapper}>
        <form className={styles.form_container}>
          <h5>Enter your registered email</h5>
          <FormInputText
            autoComplete="false"
            hasError={emailValidationError}
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
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
