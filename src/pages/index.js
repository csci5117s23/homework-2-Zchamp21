import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { isLoaded, useUser, SignIn } from "@clerk/clerk-react";
import Todos from './todos';
import { useRouter } from 'next/router';
import { Router, redirect, useNavigate } from 'react-router-dom';

//TODO: Need to add a check if the user is already logged in.
//TODO: If so, redirect to /todos.

//TODO: Update the link to go to the login page.
export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log('user: ', user);
      router.push('/todos');
    }
  }, [user])

  return (
    <>
      {/* <SignedOut> */}
        {/* <SignIn></SignIn> */}
        <Head>
          <title>Welcome!</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className={styles.mainDiv}>
          <main>
            <h1 className={styles.welcome}>Welcome to Zach's To-Do App!</h1>
            <br></br><br></br>
            <h2>If you would like to make your own to-do list, please login <Link href='/todos'>here</Link>!</h2>
          </main>
        </div>
      {/* </SignedOut> */}
    </>
  );

  return (
    <Layout>
      <Head>
        <title>Welcome!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainDiv}>
        <main>
          <h1 className={styles.welcome}>Welcome to Zach's To-Do App!</h1>
          <br></br><br></br>
          <h2>If you would to make your own to-do list, please login <Link href='/todos'>here</Link>!</h2>
        </main>
      </div>
    </Layout>
  )
}
