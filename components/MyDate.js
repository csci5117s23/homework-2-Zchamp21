import { parseISO, format } from 'date-fns';
import React from 'react';
import styles from '../styles/TodoItems.module.css';

export default function MyDate({ date, isOverdue }) {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // This replaces hyphens with '/', because if the date is constructed with hyphens, it
  // potentially creates a date with the wrong day for some reason.
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  let newDate = new Date(date.toString().replace(/-/g, '\/'));

  let month = newDate.getMonth();
  let day = newDate.getDate();
  let year = newDate.getFullYear();

  let dateStr = `${months[month]} ${day}, ${year}`;

  
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  newDate.setHours(0, 0, 0, 0);

  let myStyle = {};
  (isOverdue ? (
    myStyle = {color: 'red'}
  ) : (
    myStyle = {color: 'black'}
  ));

  return (
    <div className={styles.date} style={myStyle}>{dateStr}</div>
  );
}