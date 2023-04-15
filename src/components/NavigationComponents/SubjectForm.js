import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import styles from '../../styles/Filters.module.css';

export default function SubjectForm({ isVisible, toggleForm, addSubject }) {
  const [color, setColor] = useState('');

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

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
        <label htmlFor='subject'></label>
        <input className={styles.subjectInput} type='text' id='subject' name='subject' placeholder='Enter your subject' required></input>
        <label htmlFor='subjectColor'></label>
        <input className={styles.colorInput} type='color' id='subjectColor' name='subjectColor' required value={color} onChange={e => setColor(e.target.value)} defaultValue="#000000"></input>
        <button type='submit' className={`${styles.submitButton} pure-button pure-button-primary`}>Add Subject</button>
        <button className={`${styles.cancelButton} pure-button`} onClick={toggleForm}>Cancel</button>
      </form>
    </div>
  ) : (
    <></>
  ));
}