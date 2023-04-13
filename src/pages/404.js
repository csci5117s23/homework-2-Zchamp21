import Head from "next/head";
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>404: Not Found</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainDiv}>
        <h1 className={styles.welcome}>Uh Oh! The page you've requested does not exist!</h1>
        <br></br><br></br>
        <h2>To go back to the To-Do's page, click <Link href='/todos'>here</Link>!</h2>
      </div>
    </>
  );
}