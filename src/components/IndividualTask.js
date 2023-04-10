import TaskData from "./TaskData";
import TaskContent from "./TaskContent";
import 'purecss';

export default function IndividualTask({ task }) {
  function handleClick() {
    console.log("Click!");
  }

  let taskData = {
    id: task._id,
    subject: task.subject,
    subjectColor: task.subjectColor,
    dueDate: task.dueDate
  };

  let taskContent = {
    id: task._id,
    title: task.title,
    description: task.description,
    subjectColor: task.subjectColor,
    isDone: task.isDone,
    handleClick: handleClick
  }

  return (
    <div className='pure-g'>
      <TaskData data={taskData}></TaskData>
      <TaskContent content={taskContent}></TaskContent>
    </div>
  )
}