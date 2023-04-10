import React from 'react';
import TodoItem from './TodoItem.js';
import styles from '../styles/TodoItems.module.css';

// TODO: Modify this to use the passed in param 'tasks' instead of items.
export default function DoneItemsList({ tasks, setIncompleteTask }) {
  // let mydate = new Date();
  // TODO: Modify this such that the database sends only the tasks that
  // TODO: are done.
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
        key={item._id}
        id={item._id}
        title={item.title}
        subject={item.subject}
        subjectColor={item.subjectColor}
        date={item.dueDate}
        isOverdue={false} // Any todo item from here will never be overdue, since they are done.
        isDone={item.isDone} 
        onClick={setIncompleteTask}
      ></TodoItem>
  );

  return (numTasks != 0 ? (
    <div>
      <br></br>
      <h2 className={styles.h2}>Complete Tasks</h2>
      <div>{todoList}</div>
    </div>
  ) : (
    <div>
      <br></br>
      <h2 className={styles.h2}>You have no complete tasks</h2>
    </div>
  ));
}