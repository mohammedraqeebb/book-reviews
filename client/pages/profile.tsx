import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { User } from './_app';

type ProfileProps = {
  user: User;
};

const Profile: FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('auth/signin');
    }
  }, []);

  return <div>Profile</div>;
};

export default Profile;
