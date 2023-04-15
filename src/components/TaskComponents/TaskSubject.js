const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { faCircle as solidFaCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import styles from '../../styles/IndividualTask.module.css';

export default function TaskSubject({ taskId, subject, subjectColor, setCurSubjectColor }) {
  // Create a default subject so tasks have a subject to go to
  // when a subject is deleted.
  let defaultSubject = {
    "title": "Default Subject",
    "color": "slategrey",
    "user": "default",
    "_id": "default"
  };

  const [isEditing, setIsEditing] = useState(false);
  const [curSubject, setCurSubject] = useState([subject, subjectColor]);
  const [subjects, setSubjects] = useState([defaultSubject]);
  const [loading, setLoading] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/subjects?user=${userId}`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token  
            }
          });
          const data = await response.json();
          setSubjects([defaultSubject]); // Reset the subjects array before concat.
          setSubjects(subjects.concat(data));
          console.log('all subjects: ', data);
          setLoading(false);
        }
      } catch(error) {
        console.error('Error: ', error);
      }
    }
    fetchSubjects();
  }, [isLoaded]);

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

  async function updateSubject(newSubject, newSubjectColor, newSubjectId) {
    try {
      if (userId) {
        const token = await getToken({ template: "codehooks" });

        const response = await fetch(backend_base + `/todoItems/${taskId}`, {
          'method': 'PATCH',
          'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            subject: newSubject,
            subjectColor: newSubjectColor,
            subjectId: newSubjectId
          })
        });
        const result = await response.json();
        console.log('Success: ', result);
      }
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

    updateSubject(subj.title, subj.color, subj._id);
    // Update the subject so the page can be updated in real time.
    setCurSubject([subj.title, subj.color]);
    setCurSubjectColor(subj.color);

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