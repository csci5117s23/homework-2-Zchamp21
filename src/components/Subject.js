import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Filters.module.css';
import Link from 'next/link';
import { faCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Subject({ subjId, name, color, page, isActive, deleteSubject}) {
  // TODO: Maybe don't have these function here. Have them in a higher level
  // TODO: then pass the single onClick function down.
  // async function deleteFromSubjects(id) {
    // TODO: Make fetch request to delete the subject with _id of id.

    // TODO: Update state to remove the deleted subject from the page?
  // }

  // async function modifyTasks() {
    // TODO: Modify all tasks with the deleted subject to be a part of the default
    // TODO: subject.

    // TODO: Maybe call the get upcoming and get overdue endpoints to update the 
    // TODO: task states.
  // }

  // async function deleteSubject() {
    // TODO: Call the above two functions when the garbage icon is clicked. Maybe
    // TODO: do an assert() first.
  // }

  async function handleDelete() {
    await deleteSubject(subjId);
  }

  let icon = <FontAwesomeIcon icon={faCircle} style={{color: color}} />
  return (
    <>
      <div className={`${styles.subject} pure-g`}>
        <div className='pure-u-22-24'>
          <Link className={styles.subjectLinks} href={`/${page}/subjects/${subjId}`}>
            {icon} {name}
          </Link>
        </div>
        <div className={`${styles.delete} pure-u-2-24`}>
          <span className={styles.deleteSpan} onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></span>
        </div>
      </div>
    </>
  );
}