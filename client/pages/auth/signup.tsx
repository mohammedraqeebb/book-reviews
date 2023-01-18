import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import Button from '../../components/button/button.component';
import Link from 'next/link';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/Signup.module.scss';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import { BACKEND_URL, User } from '../_app';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const INITIAL_SIGN_UP_FIELDS = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
type SignupProps = {
  user: User | null;
};

const Signup: FC<SignupProps> = ({ user }) => {
  const router = useRouter();
  const [signupFormFields, setSignupFormFields] = useState(
    INITIAL_SIGN_UP_FIELDS
  );
  const [showPassword, setShowPassword] = useState(false);
  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/auth/signup`,
    method: 'post',
    onSuccess: () => {
      router.reload();
      router.back();
    },
    body: signupFormFields,
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupFormFields({ ...signupFormFields, [name]: value });
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
    <div className={styles.signup_wrapper}>
      <div className={styles.signup_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h4>Signup form</h4>
          <FormInputText
            autoComplete="off"
            type="text"
            label="name"
            name="name"
            onChange={handleChange}
            placeholder="Tom Hanks"
            required={true}
          />
          <FormInputText
            autoComplete="off"
            type="email"
            label="email"
            name="email"
            onChange={handleChange}
            placeholder="tom@example.com"
            required={true}
          />
          <div className={styles.password_input_container}>
            <FormInputText
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleChange}
              label="password"
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
          <div className={styles.password_input_container}>
            <FormInputText
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              onChange={handleChange}
              label="confirm password"
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

          <p className={styles.signin_description}>
            Already have an account?{' '}
            <Link className={styles.signin_page_link} href="/auth/signin">
              Sign In
            </Link>
          </p>
          <Button type="submit" onClick={handleSubmit} width="100%">
            sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
