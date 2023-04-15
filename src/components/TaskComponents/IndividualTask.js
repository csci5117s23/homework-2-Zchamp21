import { useState } from 'react';
import TaskData from "./TaskData";
import TaskContent from "./TaskContent";

export default function IndividualTask({ task, setComplete }) {
  const [curSubjectColor, setCurSubjectColor] = useState(task.subjectColor);

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
    subjectColor: curSubjectColor,
    isDone: task.isDone,
  }

  return (
    <div className='pure-g'>
      <TaskData data={taskData} setCurSubjectColor={setCurSubjectColor}></TaskData>
      <TaskContent content={taskContent} setComplete={setComplete}></TaskContent>
    </div>
  )
}