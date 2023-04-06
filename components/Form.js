// import 'purecss';

import React, { useState } from "react";
import styles from '../styles/Todos.module.css';

export default function Form({ isVisible, cancelForm, addTask }) {
  const [id, setId] = useState(0);

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  let yearStr = year.toString();
  let monthStr = '';
  if (month < 10) {
    monthStr = `0${month.toString()}`;
  } else {
    monthStr = month.toString();
  }
  let dayStr = '';
  if (day < 10) {
    dayStr = `0${day.toString()}`;
  } else {
    dayStr = day.toString();
  }
  
  let todayStr = `${yearStr}-${monthStr}-${dayStr}`;

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    let newTask = {
      id: id,
      title: formJson.title,
      subject: formJson.subject,
      subjectColor: 'cornflowerBlue',
      date: formJson.date
    }
    addTask(newTask);
    setId(id + 1);

    e.target.reset();
  }

  return (isVisible ? (
    <div className={styles.formDiv}>
      <form className={`${styles.addTaskForm}`} onSubmit={handleSubmit} method='post'>
        <div className={styles.formTitle}>
          <label htmlFor='title'></label>
          <input className={styles.titleInput} type='text' id='title' name='title' placeholder='Title' required></input>
        </div>
        <div className={styles.formDescription}>
          <label htmlFor='description'></label>
          <textarea className={styles.descriptionInput} id='description' name='description' placeholder='Optional Description'></textarea>
        </div>
        <div className={styles.formDateSubject}>
          <label htmlFor='date'></label>
          <input className={styles.dateInput} type='date' id='date' name='date' required defaultValue={todayStr} min={todayStr}></input>
          <label htmlFor='subject'></label>
          <select name='subject' id='subject' required>
            <option value=''>Select Subject</option>
            <option value='Test Subject'>Test Subject</option>
          </select>
        </div>
        <div className={styles.formSubmit}>
          <button className={`${styles.cancelButton} pure-button`} onClick={cancelForm}>Cancel</button>
          <button type='submit' className='pure-button pure-button-primary'>Add Task</button>
        </div>
      </form>
    </div>
  ) : (
    <></>
  ));
}