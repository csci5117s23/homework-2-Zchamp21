import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from '../../styles/Filters.module.css';

export default function Subject({ subjId, name, color, page, deleteSubject, curSubjId }) {
  async function handleDelete() {
    await deleteSubject(subjId);
  }

  let isActiveStyle = {};
  if (curSubjId === subjId) {
    isActiveStyle = {
      backgroundColor: '#E8E8E8'
    }
  }

  // I don't want to allow deletion of the default subject.
  // The delete button wouldn't work for the default subject in my implementation anyway, since the 
  // default subject is not stored in the database, but why have it there if it wouldn't work.
  let isDefault = subjId === "default";

  let icon = <FontAwesomeIcon icon={faCircle} style={{color: color}} />
  return (
    <>
      <div className={`${styles.subject} pure-g`}>
        <div className='pure-u-21-24'>
          <Link className={styles.subjectLinks} href={`/${page}/subjects/${subjId}`} style={isActiveStyle}>
            {icon} {name}
          </Link>
        </div>
        <div className={`${styles.delete} pure-u-2-24`}>
          {isDefault ? (
            <></>
          ) : (
            <span className={styles.deleteSpan} onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></span>
          )}
        </div>
      </div>
    </>
  );
}