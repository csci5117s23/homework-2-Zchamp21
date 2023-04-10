// import 'purecss';

import React, { useEffect, useState } from "react";
import styles from '../styles/Todos.module.css';

// TODO: Update so that subjects get updated when a new subject is created.
export default function Form({ isVisible, cancelForm, addTask }) {
  const API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/subjects';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';
  
  const [id, setId] = useState(0);
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({});
  const [curSubject, setCurSubject] = useState(null);

  // const [subjectList, setSubjectList] = useState([]);

  // useEffect(() => {
  //   const fetchSingleSubject = async () => {
  //     try {
  //         let url = API_ENDPOINT + '/' + newTask.subject;
  //         console.log(url);
  //         const response = await fetch(url, {
  //           'method': 'GET',
  //           'headers': {'x-apikey': API_KEY}
  //         });
  //         const data = await response.json();
  //         setCurSubject(data);
  //         // setCurSubjectId(id => '')
  //         // setLoading(true);
  //     } catch(error) {
  //       console.error('Error: ', error);
  //     }
  //   }
  //   fetchSingleSubject();
  // }, [newTask]);

  useEffect(() => {
    const fetchSubjects = async () => {
      // console.log('rendering')
      try {
        const response = await fetch(API_ENDPOINT, {
          'method': 'GET',
          'headers': {'x-apikey': API_KEY}
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

  function findSingleSubject(subjId) {
    for (let subject of subjects) {
      if (subject._id === subjId) {
        return subject;
      }
    }
  }

  // Calculate today's date in a form that is acceptable
  // in an html form value attribute.
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
    let subj = findSingleSubject(formJson.subject);
    console.log('subj: ', subj);
    console.log('color: ', subj.color);
    console.log('title: ', subj.title);
    
    console.log('subject data: ', curSubject);
    console.log('submitting date: ', formJson.date);

    let newTask = {
      title: formJson.title,
      description: formJson.description,
      subject: subj.title,
      subjectColor: subj.color,
      dueDate: formJson.date,
      isDone: false
    };
    addTask(newTask);
    setId(id + 1);

    e.target.reset();
  }

  if (loading) {
    return (isVisible ? (
      <span className={styles.loadingSpan}>LOADING...</span>
    ) : (
      <></>
    ));
  } else {
    let subjectsList = subjects.map(
      (subject) =>
        <option key={subject._id} value={subject._id}>{subject.title}</option>
    );

    let selectSubject;
    if (subjectsList.length > 0) {
      selectSubject = (
        <select name='subject' id='subject' required>
          <option value=''>Select Subject</option>
          {subjectsList}
        </select>
      );
    } else {
      selectSubject = (
        <select name='subject' id='subject' required>
          <option value=''>Please add a subject before making a post.</option>
        </select>
      );
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
            {selectSubject}
            {/* <select name='subject' id='subject' required>
              <option value=''>Select Subject</option>
              <option value='Test Subject'>Test Subject</option>
            </select> */}
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
}