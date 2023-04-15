import TaskDescription from './TaskDescription';
import TaskTitle from './TaskTitle';

export default function TaskContent({ content, setComplete }) {
  return (
    <div className='pure-u-17-24'>
      <TaskTitle
        id={content.id}
        title={content.title}
        subjectColor={content.subjectColor}
        isDone={content.isDone}
        setComplete={setComplete}
      ></TaskTitle>
      <TaskDescription
        id={content.id}
        description={content.description}
      ></TaskDescription>
    </div>
  )
}