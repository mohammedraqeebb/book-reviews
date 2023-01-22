import { useRouter } from 'next/router';
import React, { FC, useEffect, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Button from '../components/button/button.component';
import { signout } from '../features/user/user-slice';
import useRequest from '../hooks/use-request';
import { BACKEND_URL } from './_app';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('auth/signin');
    }
  }, []);

  const { doRequest, errors } = useRequest<null>({
    url: `${BACKEND_URL}/auth/signout`,
    method: 'post',
    onSuccess: () => {
      dispatch(signout());
      router.push('/auth/signup');
    },
  });
  const handleSignout = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await doRequest();
  };

  return (
    <div>
      <Button onClick={handleSignout} width="100px">
        signout
      </Button>
    </div>
  );
};

export default Profile;
