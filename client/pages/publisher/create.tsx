import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../components/button/button.component';
import DropdownSelect, {
  SelectOption,
} from '../../components/dropdown-select/dropdown-select.component';
import FormInputText from '../../components/form-input-text.tsx/form-input-text.component';
import TextAreaInput from '../../components/text-area/text-area.component';
import useRequest from '../../hooks/use-request';
import styles from '../../styles/CreatePublisher.module.scss';
import { BACKEND_URL } from '../_app';

const INITAL_PUBLISHER_FORM_FIELDS = {
  name: '',
  establishedDate: '',
  bio: '',
  street: '',
  state: '',
  country: '',
  countryCode: '',
  phoneNumber: '',
};
type Gender = 'male' | 'female';

type Publisher = {
  name: string;
  bio: string;
  street: string;
  state: string;
  establishedDate: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
};

const CreatePublisher = () => {
  const [publisherFormFields, setPublisherFormFields] = useState(
    INITAL_PUBLISHER_FORM_FIELDS
  );

  const FormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPublisherFormFields({ ...publisherFormFields, [name]: value });
  };
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPublisherFormFields({ ...publisherFormFields, [name]: value });
  };
  const { doRequest, errors } = useRequest<Publisher>({
    url: `${BACKEND_URL}/publisher/create`,
    method: 'post',
    body: { ...publisherFormFields },
    onSuccess: () => {},
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    doRequest();
  };
  console.log(publisherFormFields);

  const {
    name,
    establishedDate,
    bio,
    country,
    countryCode,
    state,
    street,
    phoneNumber,
  } = publisherFormFields;
  return (
    <div className={styles.create_author_wrapper}>
      <div className={styles.create_author_form_wrapper}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h4>create publisher form</h4>
          <FormInputText
            autoComplete="off"
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={FormInputChange}
            placeholder="The Alchemist"
            required={true}
          />
          <FormInputText
            autoComplete="off"
            type="date"
            label="When was the company created?"
            name="establishedDate"
            value={establishedDate}
            onChange={FormInputChange}
            required={true}
          />
          <TextAreaInput
            autoComplete="off"
            label="Company Bio"
            value={bio}
            name="bio"
            placeholder="write your companies achievements"
            onChange={handleTextAreaChange}
            required
          />
          <div className={styles.phone_number_container}>
            <span className={styles.country_code_container}>
              <FormInputText
                autoComplete="off"
                label="Country code"
                value={countryCode}
                name="countryCode"
                type="tel"
                placeholder="+91"
                onChange={FormInputChange}
                required
              />
            </span>
            <span className={styles.phone_number_container}>
              <FormInputText
                autoComplete="off"
                type="tel"
                label="Phone number"
                value={phoneNumber}
                name="phoneNumber"
                placeholder="99999999999"
                onChange={FormInputChange}
                required
              />
            </span>
          </div>
          <h5>Address</h5>
          <FormInputText
            autoComplete="off"
            type="text"
            label="Street"
            value={street}
            name="street"
            placeholder="21/12, Burj Al Arab"
            onChange={FormInputChange}
            required
          />
          <div className={styles.state_and_country_container}>
            <span className={styles.state_container}>
              <FormInputText
                autoComplete="off"
                type="text"
                label="State"
                value={state}
                name="state"
                placeholder="Abu Dhabi"
                onChange={FormInputChange}
                required
              />
            </span>
            <span className={styles.country_container}>
              <FormInputText
                autoComplete="off"
                type="text"
                label="Country"
                value={country}
                name="country"
                placeholder="UAE"
                onChange={FormInputChange}
                required
              />
            </span>
          </div>
          <Button type="submit" onClick={handleSubmit} width="100%">
            create publisher page
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePublisher;
