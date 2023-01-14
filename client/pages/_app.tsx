import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/header.component';
import Navbar from '../components/navbar/navbar.component';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Navbar />
    </>
  );
}
