import styles from '../styles/IndividualTask.module.css';
import TaskDescription from './TaskDescription';
import TaskTitle from './TaskTitle';

export default function TaskContent({ content }) {
  return (
    <div className='pure-u-17-24'>
      <TaskTitle
        id={content.id}
        title={content.title}
        subjectColor={content.subjectColor}
        isDone={content.isDone}
        onClick={content.handleClick}
      ></TaskTitle>
      <TaskDescription
        id={content.id}
        description={content.description}
      ></TaskDescription>
    </div>
  )
}