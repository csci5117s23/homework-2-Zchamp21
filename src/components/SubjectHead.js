import styles from '../styles/Filters.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SubjectHead({ toggleForm }) {
  return (
    <div className={styles.subjectHeader}>
      <h2>Subjects<span className={styles.add} onClick={toggleForm}><FontAwesomeIcon icon={faPlus} /></span></h2>
      {/* <h2><span className={styles.add} onClick={showSubjectForm}><FontAwesomeIcon icon={faPlus} style={{color: '#000000',}} /></span></h2> */}
    </div>
  );
}