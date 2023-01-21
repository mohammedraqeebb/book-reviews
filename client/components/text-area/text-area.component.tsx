import React, { FC, InputHTMLAttributes } from 'react';
import styles from './TextAreaInput.module.scss';

type TextAreaProps = {
  label: string;
  required: boolean;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const TextAreaInput: FC<TextAreaProps> = ({ label, required, ...props }) => {
  return (
    <div className={styles.text_area_container}>
      <textarea {...props} className={styles.text_area_input}></textarea>
      <div className={styles.label_container}>
        <label className={styles.label_text}>{label}</label>
        {required && <span className={styles.required}>*</span>}
      </div>
    </div>
  );
};

export default TextAreaInput;
