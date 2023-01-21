import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import Button from '../../components/button/button.component';
import Link from 'next/link';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import styles from '../../styles/Signup.module.scss';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import { BACKEND_URL } from '../_app';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signin } from '../../features/user/user-slice';

const INITIAL_SIGN_UP_FIELDS = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [signupFormFields, setSignupFormFields] = useState(
    INITIAL_SIGN_UP_FIELDS
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupFormFields({ ...signupFormFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await doRequest();
  };

  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/auth/signup`,
    method: 'post',
    onSuccess: (data) => {
      dispatch(signin(data));
      router.back();
    },
    body: signupFormFields,
  });

  useEffect(() => {
    if (user) {
      router.push('/profile');
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
            info={true}
            validationMessage="should be atleast one character"
          />
          <FormInputText
            autoComplete="off"
            type="email"
            label="email"
            placeholder="tom@example.com"
            name="email"
            onChange={handleChange}
            required={true}
          />
          <div className={styles.password_input_container}>
            <FormInputText
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="password"
              info
              validationMessage="must contain a small letter, capital letter, a digit,a special character and length atleast eight characters"
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
              info
              validationMessage="must match with password"
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
