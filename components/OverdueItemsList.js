import React from "react";
import TodoItem from "./TodoItem";
import styles from '../styles/TodoItems.module.css';

export default function OverdueItemsList() {
  // TODO: Modify this such that the database sends all tasks that have 
  // TODO: an overdue due date.
  let mydate = new Date('2023/04/01');
  // let mydate = new Date(2023, 3, 1);
  let items = [
    {
      id: 4,
      title: 'This is overdue',
      subject: 'This is 20 character',
      subjectColor: 'cornflowerBlue',
      date: mydate
    },
    {
      id: 5,
      title: 'This is overdue',
      subject: 'This is 20 character',
      subjectColor: 'cornflowerBlue',
      date: mydate
    },
    {
      id: 6,
      title: 'This is overdue',
      subject: 'This is 20 character',
      subjectColor: 'cornflowerBlue',
      date: mydate
    }
  ];
  // TODO: Update this to be the count of overdue items.
  let numOverdue = 3;
  let overdueList = items.map(
    (item) =>
      <TodoItem
        key={item.id}
        title={item.title}
        subject={item.subject}
        subjectColor={item.subjectColor}
        date={item.date}
        isOverdue={true} // Any todo item from here will be overdue.
        isDone={false} // Any todo item from here will never be done.
      ></TodoItem>
  );

  return (numOverdue != 0 ? (
    <div>
      <h2 className={styles.h2}>Overdue</h2>
      <div>{overdueList}</div>
      <br></br>
    </div>
  ) : (
    <></>
  ));

  return (
    <div>
      <h2>Overdue</h2>
      <div>{overdueList}</div>
      <br></br>
    </div>
  )
}