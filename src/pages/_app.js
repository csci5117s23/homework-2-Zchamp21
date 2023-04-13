import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';
import 'purecss';
import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { BrowserRouter, Router } from 'react-router-dom';
import { useRouter } from 'next/router';

// https://github.com/vercel/next.js/issues/9992#issuecomment-784133959
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ClerkProvider>
      <Component {...pageProps} key={router.asPath} />
    </ClerkProvider>
  );
}