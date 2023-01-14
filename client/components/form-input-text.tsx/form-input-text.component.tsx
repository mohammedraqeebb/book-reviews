import React, { InputHTMLAttributes, FC } from 'react';
import styles from './FormInputText.module.scss';

type FormInputTextProps = {
  label: string;
  required: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
const FormInputText: FC<FormInputTextProps> = ({
  label,
  required,
  ...otherprops
}) => {
  return (
    <div className={styles.form_input_text_container}>
      <input {...otherprops} />
      <div className={styles.label_container}>
        <label className={styles.label_text}>{label}</label>
        {required && <span className={styles.required}>*</span>}
      </div>
    </div>
  );
};

export default FormInputText;
