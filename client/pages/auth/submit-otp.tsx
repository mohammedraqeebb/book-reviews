import React, { useState, KeyboardEvent, useEffect } from 'react';
import styles from '../../styles/SubmitOTP.module.scss';
import { AiFillRightCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
import { BACKEND_URL } from '../_app';

const SubmitOTP = () => {
  const [OTP, setOTP] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const [timer, setTimer] = useState(120);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = () => {
    if (activeIndex === 0) {
      setActiveIndex(0);
    }
  };
  useRequest({ url: `${BACKEND_URL}/auth/` });

  useEffect(() => {
    if (timer <= 0) {
      router.back();
    }
    const setInternalTime = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(setInternalTime);
  }, [timer]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log('keyboard hit');
    if (e.key === 'Backspace') {
      console.log('bacspace');
      if (OTP[activeIndex] !== '') {
        console.log('hit');
        OTP[activeIndex] = '';
        let newOTP = [...OTP];
        newOTP[activeIndex] = '';
        setOTP(newOTP);
      } else if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (e.key.match(/^[0-9]$/)) {
      if (activeIndex === 5 && OTP[activeIndex] !== '') {
        return;
      }
      const newOTP = [...OTP];
      newOTP[activeIndex] = e.key;
      setOTP(newOTP);
      if (activeIndex < 5) {
        setActiveIndex(activeIndex + 1);
      }
    }
  };
  return (
    <div className={styles.otp_submit_wrapper}>
      <div className={styles.otp_submit_container}>
        <div
          className={styles.otp_input_container}
          onClick={handleClick}
          onKeyDown={(e) => handleKeyDown(e)}
          tabIndex={0}
          inputMode="numeric"
        >
          <form className={styles.form_container}>
            {OTP.map((digit, index) => (
              <div
                key={index}
                className={`${styles.otp_digit} ${
                  activeIndex === index ? styles.active : ''
                }`}
              >
                {digit}
              </div>
            ))}
            <button
              disabled={OTP[5] === ''}
              className={styles.otp_submit_button}
            >
              <AiFillRightCircle
                color={OTP[5] === '' ? '#9dd4fa' : '#04395e'}
                size={20}
              />
            </button>
          </form>
        </div>
        <p className={styles.timer_container}>
          you have <span>{timer}</span> seconds left{' '}
        </p>
      </div>
    </div>
  );
};

export default SubmitOTP;
