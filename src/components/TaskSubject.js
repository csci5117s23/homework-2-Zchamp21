const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from "react";
import styles from '../styles/IndividualTask.module.css';
import { faCircle as solidFaCircle, faCircleCheck as solidFaCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faCircle as hollowFaCircle, faCircleCheck as hollowFaCircleCheck} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TaskSubject({ taskId, subject, subjectColor }) {
  const SUBJECT_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/subjects';
  const TODO_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  const [isEditing, setIsEditing] = useState(false);
  // TODO: curSubject might need to move up a level.
  const [curSubject, setCurSubject] = useState([subject, subjectColor]);
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      // console.log('rendering')
      try {
        const response = await fetch(backend_base + '/subjects', {
          'method': 'GET',
          'headers': {
            'x-apikey': API_KEY}
        });
        const data = await response.json();
        setSubjects(data);
        console.log('all subjects: ', data);
        setLoading(false);
      } catch(error) {
        console.error('Error: ', error);
      }
    }
    fetchSubjects();
  }, []);

  function showEdit() {
    setIsEditing(!isEditing);
  }

  function findSingleSubject(subjId) {
    for (let subject of subjects) {
      if (subject._id === subjId) {
        return subject;
      }
    }
  }

  async function updateSubject(newSubject, newSubjectColor) {
    try {
      const response = await fetch(backend_base + `/todoItems/${taskId}`, {
        'method': 'PATCH',
        'headers': {
          'x-apikey': API_KEY,
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          subject: newSubject,
          subjectColor: newSubjectColor
        })
      });
      const result = await response.json();
      console.log('Success: ', result);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    let subj = findSingleSubject(formJson.subject);

    updateSubject(subj.title, subj.color);
    // Update the subject so the page can be updated in real time.
    setCurSubject([subj.title, subj.color]);

    setIsEditing(false);
    e.target.reset();
  }

  let subjectForm = <></>
  if (loading) {
    subjectForm = <span>LOADING...</span>
  } else {
    let subjectsList = subjects.map(
      (subject) => 
        <option key={subject._id} value={subject._id}>{subject.title}</option>
    );

    subjectForm = (
      <div className={styles.subjectFormDiv}>
        <form onSubmit={handleSubmit}>
          <select name='subject' id='subject' required>
            <option value=''>Select Subject</option>
            {subjectsList}
          </select>
          <button className={`${styles.updateSubjButton} pure-button pure-button-primary`} type='submit'>Update</button>
          <button className={`${styles.updateSubjButton} pure-button`} onClick={showEdit}>Cancel</button>
        </form>
      </div>
    )
  }

  return (isEditing ? (
    <>
      {subjectForm}
    </>
  ) : (
    <div className={styles.subjectDiv}>
      <span className={styles.subjectIcon}><FontAwesomeIcon icon={solidFaCircle} style={{color: curSubject[1],}} />&nbsp;</span>
      <span className={styles.subject}>{curSubject[0]} </span>
      <span className={styles.editSubject} onClick={showEdit}>Edit</span>
    </div>
  ));
}