import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/Filters.module.css';

export default function SubjectHead({ toggleForm }) {
  return (
    <div className={styles.subjectHeader}>
      <h2>Subjects<span className={styles.add} onClick={toggleForm}><FontAwesomeIcon icon={faPlus} /></span></h2>
    </div>
  );
}