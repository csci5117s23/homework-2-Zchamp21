import TaskSubject from "./TaskSubject";
import TaskDate from "./TaskDate";
import styles from '../styles/IndividualTask.module.css';
import FilterList from "./FilterList";
import GoBack from "./GoBack";

export default function TaskData({ data }) {
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
  console.log('date string: ', dateStr);
  let newDate = new Date(dateStr);
  newDate.setHours(0, 0, 0, 0);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let isOverdue = newDate < today;

  return (
    <div className={`${styles.taskData} pure-u-7-24`}>
      <GoBack></GoBack>
      <TaskSubject taskId={data.id} subject={data.subject} subjectColor={data.subjectColor}></TaskSubject>
      <TaskDate taskId={data.id} date={data.dueDate} isOverdue={isOverdue}></TaskDate>
      {/* <br></br>
      <FilterList curPage=''></FilterList> */}
    </div>
  )
}