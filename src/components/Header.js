import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/Todos.module.css';
import { UserButton } from '@clerk/nextjs';

export default function Header({ username, page, showTopForm }) {
  let message = '';
  let addFormButton = <></>
  // We only want to allow users to add tasks from the to-do's page.
  if (page === 'todos') {
    message = 'Here are your To Do\'s!';
    addFormButton = <span className={styles.add} onClick={showTopForm}><FontAwesomeIcon icon={faPlus} style={{color: '#ffffff',}} /></span>
  } else if (page === 'done') {
    message = 'Here are your completed To Do\'s!';
  } else if (page === 'individualTask') {
    message = 'Here is your desired To Do task!';
  }

  // TODO: Redirect the logout button to the correct url once we get authentication set up.
  return (
    <div className={`${styles.welcome} pure-g`}>
      <div className='pure-u-20-24'>
        <h1 className={styles.h1}>Welcome! {message}</h1>
      </div>
      <div className='pure-u-3-24'>
        <h1 className={`${styles.h1} ${styles.add_logout}`}>
          {addFormButton}
        </h1>
      </div>
      <div className='pure-u-1-24'>
        <h1 className={`${styles.h1} ${styles.add_logout}`}>
          <UserButton />
        </h1>
      </div>
      {/* <div className='pure-u-6-24'>
        <h1 className={`${styles.h1} ${styles.add_logout}`}>
          {addFormButton}
          <Link href='/logout'><span className={styles.logout}>Logout</span></Link>
        </h1>
      </div> */}
    </div>
  );
}