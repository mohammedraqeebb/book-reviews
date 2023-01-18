import React, { useState } from 'react';
import DatePicker from '../components/date-picker/date-picker.component';
import FormInputText from '../components/form-input-text.tsx/form-input-text.component';
import SearchBox from '../components/search-box.component';
import TextAreaInput from '../components/text-area/text-area.component';
import styles from '../styles/Post.module.scss';

const Post = () => {
  const [searchAuthorField, setSearchAuthorField] = useState('');
  const [searchPublisherField, setSearchPublisherField] = useState('');
  return (
    <div className={styles.post_wrapper}>
      <div className={styles.post_form_wrapper}>
        <form className={styles.form_container}>
          <FormInputText
            type="text"
            name="name"
            label="Name"
            placeholder="The Alchemist"
            required
            autoComplete="off"
            autoFocus
          />
          <FormInputText
            type="date"
            name="dateOfRelease"
            label="Date Of Release"
            placeholder="The Alchemist"
            required
          />
          <TextAreaInput label="About (min 50 characters)" required />
          <SearchBox
            width="100"
            iconSize={10}
            placeholder="search for authors"
          />
        </form>
      </div>
    </div>
  );
};

export default Post;
