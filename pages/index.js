import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import React from 'react';

//TODO: Need to add a check if the user is already logged in.
//TODO: If so, redirect to /todos.

//TODO: Update the link to go to the login page.
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Welcome!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainDiv}>
        <main>
          <h1 className={styles.welcome}>Welcome to Zach's Todo App!</h1>
          <br></br><br></br>
          <h2>If you would to make your own todo list, please login <Link href='/todos'>here</Link>!</h2>
        </main>
      </div>
    </Layout>
  )
}
