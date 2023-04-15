import { faCircle as solidFaCircle, faCircleCheck as solidFaCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faCircle as hollowFaCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Link from 'next/link';
import MyDate from './MyDate.js';
import styles from '../../styles/TodoItems.module.css';

export default function TodoItem({ id, title, subject, subjectColor, date, isOverdue, isDone, onClick }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(isDone);
  
  function handleMouseHover() {
    setIsHovering(!isHovering);
  }
  
  function handleClick() {
    setIsClicked(!isClicked);
    onClick(id, !isDone);
  }

  // Initialize the checkbox depending on the value of isHovering.
  // If isHovering is true, then stack two icons to show a preview of a checked checkbox.
  // Otherwise, only use a circle icon which represents an un-checked checkbox.
  let checkbox = (isHovering ? (
    <div className={styles.checkboxDiv}>
      <span className={styles.hoverSpan} onClick={handleClick} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
        <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={hollowFaCircle} style={{color: subjectColor,}} /></span>
        <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={solidFaCircleCheck} style={{color: subjectColor, opacity: '0.5'}}/></span>
      </span>
    </div>
  ) : (
    <div className={styles.checkboxDiv}>
      <span className={styles.hoverSpan} onClick={handleClick} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
        <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={hollowFaCircle} style={{color: subjectColor,}} /></span>
      </span>
    </div>
  ));

  // Set a default for the title of the to-do item.
  let newTitle = (
    <span className={styles.titleLinkSpan}><Link href={`/todos/${id}`}><span className={styles.titleLink}>{title}</span></Link></span>
  );

  // Overwrite the default checkbox and title depending on the value of isDone.
  // If isDone is true, then update the checkbox to always have the stacked icons and the title to have a strike-through.
  // Otherwise, the defaults assigned above are used.
  if (isClicked) {
    checkbox = (
      <div className={styles.checkboxDiv}>
        <span className={styles.hoverSpan} onClick={handleClick} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
          <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={hollowFaCircle} style={{color: subjectColor,}} /></span>
          <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={solidFaCircleCheck} style={{color: subjectColor, opacity: '0.5'}}/></span>
        </span>
      </div>
    );

    // Update the title to have a strike-through if the checkbox is checked.
    newTitle =(
      <span className={styles.titleText}>{title}</span>
    );
  }

  return (
    <div className={`${styles.todoItem} pure-g`}>
      <div className={`fa-stack ${styles.checkboxDiv} pure-u-1-24`}>
        {checkbox}
      </div>
      <div className='pure-u-18-24'>
        <span className={styles.title}>{newTitle}</span>
        <br></br><br></br>
        <MyDate date={date} isOverdue={isOverdue}></MyDate>
      </div>
      <div className='pure-u-4-24'>
        <div className={styles.subjectDiv}>
          <span className={styles.subjectIcon}><FontAwesomeIcon icon={solidFaCircle} style={{color: subjectColor,}} />&nbsp;</span>
          <span className={styles.subject}>{subject} </span>
        </div>
      </div>
    </div>
  )
}