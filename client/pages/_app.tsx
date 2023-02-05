import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/header.component';
import Navbar from '../components/navbar/navbar.component';
import buildClient from '../api/build-client';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export const BACKEND_URL = 'http://localhost:4000/api';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Navbar />
      </Provider>
    </>
  );
}

App.getInitialProps = () => {
  return {};
};
