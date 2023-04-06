import React from 'react';
import TodoItem from './TodoItem.js';
import styles from '../styles/TodoItems.module.css';

export default function TodoItemsList({ tasks }) {
  // let mydate = new Date();
  // TODO: Modify this such that the database sends only the tasks that
  // TODO: are upcoming. I.e., not overdue.
  // let items = [
  //   {
  //     id: 0,
  //     title: 'This is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily long',
  //     subject: 'This is 20 character',
  //     subjectColor: 'cornflowerBlue',
  //     date: mydate
  //   },
  //   {
  //     id: 1,
  //     title: 'This is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily long',
  //     subject: 'This is 20 character',
  //     subjectColor: 'red',
  //     date: mydate
  //   },
  //   {
  //     id: 2,
  //     title: 'This is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily long',
  //     subject: 'This is 20 character',
  //     subjectColor: 'purple',
  //     date: mydate
  //   },
  //   {
  //     id: 3,
  //     title: 'This is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily longThis is unnecesarily long',
  //     subject: 'This is 20 character',
  //     subjectColor: 'green',
  //     date: mydate
  //   }
  // ];
  let numTasks = tasks.length;
  let todoList = tasks.map(
    (item) =>
      <TodoItem
        key={item.id}
        title={item.title}
        subject={item.subject}
        subjectColor={item.subjectColor}
        date={item.date}
        isOverdue={false} // Any todo item from here will never be overdue.
        isDone={false} // Any todo item from here will never be done.
      ></TodoItem>
  );

  return (numTasks != 0 ? (
    <div>
      <br></br>
      <h2 className={styles.h2}>Upcoming</h2>
      <div>{todoList}</div>
    </div>
  ) : (
    <></>
  ));
}