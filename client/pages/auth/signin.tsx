import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/Signin.module.scss';
import Link from 'next/link';
import Button from '../../components/button/button.component';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
import { BACKEND_URL, User } from '../_app';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const INITIAL_SIGN_IN_FIELDS = {
  email: '',
  password: '',
};
type SigninProps = {
  user: User | null;
};

const Signin: FC<SigninProps> = ({ user }) => {
  const router = useRouter();
  const [signinFormFields, setSigninFormFields] = useState(
    INITIAL_SIGN_IN_FIELDS
  );
  const [showPassword, setShowPassword] = useState(false);
  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/auth/signin`,
    method: 'post',
    onSuccess: () => {
      router.reload();
    },
    body: signinFormFields,
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSigninFormFields({ ...signinFormFields, [name]: value });
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    doRequest();
  };
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);
  return (
    <div className={styles.signin_wrapper}>
      <div className={styles.signin_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h4>Signin form</h4>
          <FormInputText
            autoComplete="off"
            type="email"
            name="email"
            onChange={handleChange}
            label="email"
            required={true}
          />
          <div className={styles.password_input_container}>
            <FormInputText
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              label="password"
              name="password"
              onChange={handleChange}
              required={true}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.password_show_control_icon}
            >
              {showPassword ? (
                <AiOutlineEye size={16} />
              ) : (
                <AiOutlineEyeInvisible size={16} />
              )}
            </span>
          </div>
          <Link
            href="/auth/forgot-password"
            className={styles.forgotten_password_page_link}
          >
            Forgotten Password?
          </Link>
          <Button type="submit" onClick={handleSubmit} width="100%">
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
