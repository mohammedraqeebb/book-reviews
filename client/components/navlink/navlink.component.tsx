import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
interface NavLinkProps {
  to: string;
  name: string;

  currentPath: string;
  activeComponent: JSX.Element;
  inactiveComponent: JSX.Element;
}

// const NavLink = ({
//   to,
//   name,
//   activeComponent,
//   inactiveComponent,
// }: NavLinkProps) => {
//   const [active, setActive] = useState(false);
//   const [currentPath, setCurrentPath] = useState('');
//   const router = useRouter();
//   useEffect(() => {
//     setCurrentPath(window.location.pathname);
//     const handleRouteChange = (url: string) => {
//       setActive(url === to);
//     };
//     router.events.on('routeChangeComplete', handleRouteChange);
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange);
//     };
//   }, [to, router.events]);
//   console.log('component');

//   return (
//     <Link href={to}>
//       {active ? activeComponent : inactiveComponent} {name}
//     </Link>
//   );
// };

const NavLink = ({
  to,
  name,
  currentPath,
  activeComponent,
  inactiveComponent,
}: NavLinkProps) => {
  const myPath = to.slice(1);
  const isActive = currentPath === myPath;
  console.log(isActive);

  return (
    <Link style={{ fontWeight: isActive ? 700 : 400 }} href={to}>
      {isActive ? activeComponent : inactiveComponent} {name}
    </Link>
  );
};

export default NavLink;
