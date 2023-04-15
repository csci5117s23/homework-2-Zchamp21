import TodoItem from './TodoItem.js';
import styles from '../../styles/TodoItems.module.css';

export default function TodoItemsList({ tasks, setCompleteTask }) {
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
        isOverdue={false} // Any todo item from here will never be overdue.
        isDone={item.isDone}
        onClick={setCompleteTask}
      ></TodoItem>
  );

  return (numTasks != 0 ? (
    <div>
      <br></br>
      <h2 className={styles.h2}>Upcoming</h2>
      <div>{todoList}</div>
    </div>
  ) : (
    <div>
      <br></br>
      <h2 className={styles.h2}>You have no upcoming tasks</h2>
      <br></br><br></br>
    </div>
  ));
}