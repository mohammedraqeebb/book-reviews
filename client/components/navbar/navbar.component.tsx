import React, { FC, useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import { user } from '../../pages/_app';
import Link from 'next/link';
import Router from 'next/router';
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
  user: user | null;
};

const Navbar: FC<NavbarProps> = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname.slice(1));
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return Router.events.off('routeChangeComplete', handleRouteChange);
  }, [currentPath, Router.events]);
  return (
    <nav>
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
      <NavLink
        to="/saved"
        name="Saved"
        currentPath={currentPath}
        activeComponent={<SavedActiveIcon />}
        inactiveComponent={<SavedIcon />}
      />
      <NavLink
        to="/post"
        name="post"
        currentPath={currentPath}
        activeComponent={<PostActiveIcon />}
        inactiveComponent={<PostIcon />}
      />
      <NavLink
        to="/profile"
        name="profile"
        currentPath={currentPath}
        activeComponent={<ProfileActiveIcon />}
        inactiveComponent={<ProfileIcon />}
      />
    </nav>
  );
};

export default Navbar;
