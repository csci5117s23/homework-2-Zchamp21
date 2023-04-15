const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import MyDate from "../TodoComponents/MyDate";
import styles from '../../styles/IndividualTask.module.css';

export default function TaskDate({ taskId, date }) {
  const [isEditing, setIsEditing] = useState(false);
  const [curDate, setCurDate] = useState(date);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function showEdit() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    const updateDate = async () => {
      if (curDate != date) {
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
                dueDate: new Date(curDate)
              })
            });
            const result = await response.json();
            console.log('Success: ', result);
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    updateDate();
  }, [isLoaded, curDate]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

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
    
    return `${yearStr}-${monthStr}-${dayStr}`;
  }

  let todayStr = calcToday();
  console.log('cur date: ', curDate);
  console.log('today str: ', todayStr);

  let isOverdue = curDate < todayStr;

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