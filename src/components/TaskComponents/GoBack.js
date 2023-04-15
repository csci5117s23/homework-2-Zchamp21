import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from '../../styles/IndividualTask.module.css';


export default function GoBack() {
  return (
    <div className={styles.goBack}>
      <span className={styles.goBackSpan}><Link href='/todos'><span className={styles.goBackIcon}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></span> <span className={styles.goBackText}>Go Back to All To Do's</span></Link></span>
    </div>
  );
}