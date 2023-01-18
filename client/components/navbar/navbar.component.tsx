import React, { FC, useEffect, useState, MouseEvent } from 'react';
import styles from './Navbar.module.scss';
import { User } from '../../pages/_app';

import { useRouter } from 'next/router';
('next/router');
import HomeActiveIcon from '../../static/assets/icons/home-active.icon ';
import NavLink from '../navlink/navlink.component';
import HomeIcon from '../../static/assets/icons/home.icon';
import SearchIcon from '../../static/assets/icons/search-icon';
import SearchActiveIcon from '../../static/assets/icons/search-active..icon';
import SavedActiveIcon from '../../static/assets/icons/saved-active.icon';
import SavedIcon from '../../static/assets/icons/saved.icon';
import PostActiveIcon from '../../static/assets/icons/post-active.icon';
import PostIcon from '../../static/assets/icons/post.icon';
import ProfileActiveIcon from '../../static/assets/icons/profile-active.icon';
import ProfileIcon from '../../static/assets/icons/profile.icon';
type NavbarProps = {
  user: User | null;
};

const Navbar: FC<NavbarProps> = ({ user }) => {
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(window.location.pathname.slice(1));
    const handleRouteChange = () => {
      setCurrentPath(router.pathname);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [currentPath, router.events, router.pathname]);

  const handleProfileClick = (event: MouseEvent<HTMLDivElement>) => {
    if (user) {
      router.push('/profile');
    } else router.push('/auth/signin');
  };

  return (
    <div className={styles.navbar_wrapper}>
      <nav className={styles.navbar_container}>
        <NavLink
          to="/"
          currentPath={currentPath}
          name="Home"
          activeComponent={<HomeActiveIcon />}
          inactiveComponent={<HomeIcon />}
        />
        <NavLink
          to="/search"
          name="search"
          currentPath={currentPath}
          activeComponent={<SearchActiveIcon />}
          inactiveComponent={<SearchIcon />}
        />
        {user && (
          <NavLink
            to="/saved"
            name="Saved"
            currentPath={currentPath}
            activeComponent={<SavedActiveIcon />}
            inactiveComponent={<SavedIcon />}
          />
        )}
        {
          <NavLink
            to="/post"
            name="post"
            currentPath={currentPath}
            activeComponent={<PostActiveIcon />}
            inactiveComponent={<PostIcon />}
          />
        }
        <div onClick={handleProfileClick}>
          <NavLink
            to="/profile"
            name="profile"
            currentPath={currentPath}
            activeComponent={<ProfileActiveIcon />}
            inactiveComponent={<ProfileIcon />}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
