import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserButton } from '@clerk/nextjs';
import styles from '../styles/Todos.module.css';

export default function Header({ message, page, showTopForm }) {
  let addFormButton = <></>
  // We only want to allow users to add tasks from the to-do's page.
  if (page === 'todos') {
    addFormButton = <span className={styles.add} onClick={showTopForm}><FontAwesomeIcon icon={faPlus} style={{color: '#ffffff',}} /></span>
  }

  return (
    <div className={`${styles.welcome} pure-g`}>
      <div className='pure-u-20-24'>
        <h1 className={styles.h1}>{message}</h1>
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
    </div>
  );
}