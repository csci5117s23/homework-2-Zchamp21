import TaskSubject from "./TaskSubject";
import TaskDate from "./TaskDate";
import GoBack from "./GoBack";
import styles from '../../styles/IndividualTask.module.css';

export default function TaskData({ data, setCurSubjectColor }) {
  let curDate = new Date(data.dueDate);

  let year = curDate.getUTCFullYear();
  let month = curDate.getUTCMonth() + 1;
  let day = curDate.getUTCDate();
  
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  let dateStr = `${year}/${month.toString()}/${day.toString()}`;
  let newDate = new Date(dateStr);
  newDate.setHours(0, 0, 0, 0);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let isOverdue = newDate < today;

  return (
    <div className={`${styles.taskData} pure-u-7-24`}>
      <GoBack></GoBack>
      <TaskSubject taskId={data.id} subject={data.subject} subjectColor={data.subjectColor} setCurSubjectColor={setCurSubjectColor}></TaskSubject>
      <TaskDate taskId={data.id} date={data.dueDate} isOverdue={isOverdue}></TaskDate>
    </div>
  )
}