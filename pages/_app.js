import '../styles/globals.css';
import 'purecss';
import React from 'react';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}