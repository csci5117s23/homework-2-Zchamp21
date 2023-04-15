import { useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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
      <Head>
        <title>Welcome!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainDiv}>
        <main>
          <h1 className={styles.welcome}>Welcome to Zach's To-Do App!</h1>
          <br></br><br></br>
          {/* <h2>If you would like to make your own to-do list, please login <Link href='https://pumped-primate-55.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Ftodos'>here</Link>!</h2> */}
          <h2>If you would like to make your own to-do list, please login <Link href='https://pumped-primate-55.accounts.dev/sign-in?redirect_url=https%3A%2F%2Ftiny-torte-956043.netlify.app%2Ftodos'>here</Link>!</h2>
        </main>
      </div>
    </>
  );
}
