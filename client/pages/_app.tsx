import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/header.component';
import Navbar from '../components/navbar/navbar.component';
import { NextPageContext } from 'next';
import axios from 'axios';

export type user = {
  id: string;
  name: string;
};

type AppComponentProps = {
  user: user | null;
} & AppProps;

export const BACKEND_URL = 'http://localhost:4000';

export default function App({ Component, pageProps, user }: AppComponentProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Navbar user={user} />
    </>
  );
}

// App.getInitialProps = async (context: NextPageContext) => {
//   const { data } = await axios.post(`${BACKEND_URL}/api/auth/currentUser`);

//   return { user: data.user };
// };
