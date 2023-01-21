import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('auth/signin');
    }
  }, []);

  return <div>Profile</div>;
};

export default Profile;
