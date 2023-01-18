import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/header.component';
import Navbar from '../components/navbar/navbar.component';
import buildClient from '../api/build-client';

export type User = {
  id: string;
  name: string;
};

type AppComponentProps = {
  user: User | null;
} & AppProps;

export const BACKEND_URL = 'http://localhost:4000/api';

export default function App({ Component, pageProps, user }: AppComponentProps) {
  console.log('user', user);
  console.log('enclosing app component run');
  return (
    <>
      <Header />
      <Component {...pageProps} user={user} />
      <Navbar user={user} />
    </>
  );
}

App.getInitialProps = async (appContext: any) => {
  const client = buildClient(appContext);
  const { data } = await client.post(`${BACKEND_URL}/auth/currentUser`);
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.user
    );
  }

  return { user: data.user, pageProps };
};
