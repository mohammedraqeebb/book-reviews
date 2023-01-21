import Link from 'next/link';
import React, { useState, ChangeEvent, useEffect } from 'react';
import FormInputText from '../components/form-input-text.tsx/form-input-text.component';
import SearchBox from '../components/search-box.component';
import TextAreaInput from '../components/text-area/text-area.component';
import styles from '../styles/Post.module.scss';
import DropdownSelect, {
  SelectOption,
} from '../components/dropdown-select/dropdown-select.component';
import useRequest from '../hooks/use-request';
import { BACKEND_URL } from './_app';
import Button from '../components/button/button.component';
import { useRouter } from 'next/router';

type Author = {
  id: string;
  name: string;
};
type Publisher = {
  id: string;
  name: string;
};
type Item = {
  id: string;
  name: string;
};

const Post = () => {
  const [searchAuthorField, setSearchAuthorField] = useState('');
  const [fetchedAuthors, setFetchedAuthors] = useState<Author[]>([]);
  const [fetchedPublishers, setFetchedPublishers] = useState<Publisher[]>([]);
  const [authors, setAuthors] = useState<SelectOption[]>([]);
  const [publisher, setPublisher] = useState<SelectOption | undefined>();
  const [searchPublisherField, setSearchPublisherField] = useState('');
  const handleSearchAuthorFieldChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchAuthorField(event.target.value);
  };
  const handleSearchPublisherFieldChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchPublisherField(event.target.value);
  };
  const options = [
    { id: 100, label: 'not selected', value: '' },
    { id: 1, label: 'biography', value: 'biography' },
    {
      id: 2,
      label: 'personality development',
      value: 'personality development',
    },
    { id: 3, label: 'comics', value: 'comics' },
    { id: 4, label: 'horror', value: 'horror' },
    { id: 5, label: 'fiction', value: 'fiction' },
    { id: 6, label: 'novel', value: 'novel' },
  ];
  const [genre, setGenre] = useState<SelectOption | undefined>(options[0]);
  const { doRequest: fetchAuthorsRequest, errors: fetchAuthorsRequestErrors } =
    useRequest<Author[]>({
      url: `${BACKEND_URL}/author/search`,
      method: 'post',
      body: { searchAuthorField },
      onSuccess: (data) => {
        setFetchedAuthors(data.authors);
      },
    });
  const {
    doRequest: fetchPublishersRequest,
    errors: fetchPublishersRequestErrors,
  } = useRequest<Publisher[]>({
    url: `${BACKEND_URL}/publisher/search`,
    method: 'post',
    body: { searchPublisherField },
    onSuccess: (data) => {
      setFetchedPublishers(data.publishers);
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (searchAuthorField === '') {
      setAuthors([]);
      return;
    }

    const fetchAuthors = async () => {
      await fetchAuthorsRequest();
    };
    fetchAuthors();
  }, [searchAuthorField]);
  const getSelectOptionsListFormat = (list: Item[]): SelectOption[] => {
    const selectOptions = list.map((currentItem) => {
      const { id, name } = currentItem;
      return { id, label: name, value: name };
    });
    return selectOptions;
  };
  useEffect(() => {
    if (searchPublisherField === '') {
      setFetchedPublishers([]);
      return;
    }

    const fetchPublishers = async () => {
      await fetchPublishersRequest();
    };
    fetchPublishers();
  }, [searchPublisherField]);

  return (
    <div className={styles.post_wrapper}>
      <div className={styles.post_form_wrapper}>
        <form className={styles.form_container}>
          <h4>Book Create Form</h4>
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
          <DropdownSelect
            label="Genre"
            required={true}
            options={options}
            onChange={(o) => setGenre(o)}
            value={genre}
          />
          <TextAreaInput label="About (min 50 characters)" required />
          <div className={styles.author_container}>
            <SearchBox
              width="100"
              iconSize={10}
              onChange={handleSearchAuthorFieldChange}
              value={searchAuthorField}
              placeholder="search for authors"
            />
            {fetchedAuthors.length > 0 && (
              <DropdownSelect
                value={authors}
                label="Select Authors"
                required
                multiple
                onChange={(o) => setAuthors(o)}
                options={getSelectOptionsListFormat(fetchedAuthors)}
                links
                basehref="/author"
              />
            )}
            <span className={styles.create_authorPage_link_container}>
              Didn't find author page?
              <Link href="/author/create"> Create One</Link>
            </span>
          </div>
          <div className={styles.publisher_container}>
            <SearchBox
              width="100"
              iconSize={10}
              value={searchPublisherField}
              onChange={handleSearchPublisherFieldChange}
              placeholder="search for publishers"
            />
            {fetchedPublishers.length > 0 && (
              <DropdownSelect
                value={publisher}
                label="Select Publisher"
                required
                onChange={(o) => setPublisher(o)}
                options={getSelectOptionsListFormat(fetchedPublishers)}
                links
                basehref="/publisher"
              />
            )}
            <span className={styles.create_publisher_page_link_container}>
              Didn't find publisher page?
              <Link href="/publisher/create"> Create One</Link>
            </span>
          </div>
          <Button width="100%">send for review and upload</Button>
        </form>
      </div>
    </div>
  );
};

export default Post;
