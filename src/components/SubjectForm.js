import { useState } from 'react';
import styles from '../styles/Filters.module.css';
import { useAuth } from '@clerk/nextjs';

export default function SubjectForm({ isVisible, toggleForm, addSubject }) {
  const [color, setColor] = useState('');

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    let newSubject = {
      title: formJson.subject,
      color: formJson.subjectColor,
      user: userId
    };
    addSubject(newSubject);

    e.target.reset();
  }

  return (isVisible ? (
    <div>
      <form className={styles.addSubjectForm} method='post' onSubmit={handleSubmit}>
        <div className={styles.subjectTitle}>
          <label htmlFor='subject'></label>
          <input className={styles.subjectInput} type='text' id='subject' name='subject' placeholder='Enter your subject' required></input>
          <label htmlFor='subjectColor'></label>
          <input className={styles.colorInput} type='color' id='subjectColor' name='subjectColor' required value={color} onChange={e => setColor(e.target.value)}></input>
        </div>
        <div className={styles.formSubmit}>
          <button className={`${styles.cancelButton} pure-button`} onClick={toggleForm}>Cancel</button>
          <button type='submit' className={`${styles.submitButton} pure-button pure-button-primary`}>Add Task</button>
        </div>
      </form>
    </div>
  ) : (
    <></>
  ));
}