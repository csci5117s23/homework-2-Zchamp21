import React from "react";
import TodoItem from "./TodoItem";
import styles from '../styles/TodoItems.module.css';

export default function OverdueItemsList({ tasks, setCompleteTask }) {
  let numOverdue = tasks.length;
  let overdueList = tasks.map(
    (item) =>
      <TodoItem
        key={item._id}
        id={item._id}
        title={item.title}
        subject={item.subject}
        subjectColor={item.subjectColor}
        date={item.dueDate}
        isOverdue={true} // Any todo item from here will be overdue.
        isDone={item.isDone}
        onClick={setCompleteTask}
      ></TodoItem>
  );

  return (numOverdue != 0 ? (
    <div>
      <h2 className={styles.h2}>Overdue</h2>
      <div>{overdueList}</div>
      <br></br>
    </div>
  ) : (
    <div>
      <h2 className={styles.h2}>You have no overdue tasks</h2>
      <br></br>
    </div>
  ));
}