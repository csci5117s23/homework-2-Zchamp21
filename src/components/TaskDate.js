const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import MyDate from "./MyDate";
import styles from '../styles/IndividualTask.module.css';
import { useEffect, useState } from "react";

export default function TaskDate({ taskId, date, isOverdue }) {
  const TODO_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  const [isEditing, setIsEditing] = useState(false);
  const [curDate, setCurDate] = useState(date);

  function showEdit() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    const updateDate = async () => {
      if (curDate != date) {
        try {
          const response = await fetch(backend_base + `/todoItems/${taskId}`, {
            'method': 'PATCH',
            'headers': {
              'x-apikey': API_KEY,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
              dueDate: new Date(curDate)
            })
          });
          const result = await response.json();
          console.log('Success: ', result);
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    updateDate();
  }, [curDate]);

  // async function updateDate(newDate) {
  //   try {
  //     const response = await fetch(TODO_API_ENDPOINT + `/${taskId}`, {
  //       'method': 'PATCH',
  //       'headers': {
  //         'x-apikey': API_KEY,
  //         'Content-Type': 'application/json'
  //       },
  //       'body': JSON.stringify({
  //         dueDate: new Date(newDate)
  //       })
  //     });
  //     const result = await response.json();
  //     console.log('Success: ', result);
  //   } catch (error) {
  //     console.error('Error: ', error);
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.date);

    // updateDate(formJson.date);
    // Update the date so the page can be updated in real time.
    setCurDate(formJson.date);

    setIsEditing(false);
    e.target.reset();
  }

  function calcToday() {
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
    return todayStr;
  }

  let todayStr = calcToday();

  return (isEditing ? (
    <div className={styles.dateFormDiv}>
      <form onSubmit={handleSubmit}>
        <input className={styles.dateInput} type='date' id='date' name='date' required defaultValue={todayStr} min={todayStr}></input>
        <button className={`${styles.updateDateButton} pure-button pure-button-primary`} type='submit'>Update</button>
        <button className={`${styles.updateDateButton} pure-button`} onClick={showEdit}>Cancel</button>
      </form>
    </div>
  ) : (
    <div className={styles.dateDiv}>
      <span className={styles.dueDate}>Due Date: </span>
      <span><MyDate date={curDate} isOverdue={isOverdue}></MyDate></span>
      <span className={styles.editDate} onClick={showEdit}>Edit</span>
    </div>
  ));
}