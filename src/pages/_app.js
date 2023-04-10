import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';
import 'purecss';
import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { BrowserRouter } from 'react-router-dom';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}