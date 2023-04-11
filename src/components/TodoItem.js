import styles from '../styles/TodoItems.module.css';
import { faCropSimple, faCircle as solidFaCircle, faCircleCheck as solidFaCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faCircle as hollowFaCircle, faCircleCheck as hollowFaCircleCheck} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
// import styles from '../styles/TodoItems.module.css';
import MyDate from './MyDate.js';
import Link from 'next/link';

// TODO: Maybe add an isDone prop when creating the 'done' page.
// TODO: Also modify the state variables, since when the 'done' page is added,
// TODO: there will be no need for the checkbox or title to be styled special
// TODO: based on state. It would be dependent on whether it is done or not.
// TODO: Done tasks should only appear on the 'done' page.
// TODO: Maybe use state to store all entries though to handle the removal or addition
// TODO: of an entry by clicking the checkbox.
export default function TodoItem({ id, title, subject, subjectColor, date, isOverdue, isDone, onClick }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(isDone);
  const [touched, setTouched] = useState(false);
  function handleMouseHover() {
    setIsHovering(!isHovering);
  }
  
  // TODO: Modify these functions so that they make database modifications.
  function handleClick() {
    setIsClicked(!isClicked);
    onClick(id, !isDone);
  }

  function handleTouch() {
    setTouched(!touched);
    if (touched) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
    setIsHovering(false); // Always set this to false on touch devices, since there is no "mouse enter" or "mouse leave".
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
      <span className={styles.hoverSpan} onClick={handleClick} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} onTouchStart={handleTouch}>
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
      <div className={styles.checkboxDiv} onClick={handleClick} onTouchStart={handleTouch}>
        <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={hollowFaCircle} style={{color: subjectColor,}} /></span>
        <span className={styles.checkboxSpan}><FontAwesomeIcon className='fa-stack-1x' icon={solidFaCircleCheck} style={{color: subjectColor, opacity: '0.5'}}/></span>
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
          {/* <span className={styles.subjectIcon}>&nbsp;<FontAwesomeIcon icon={solidFaCircle} style={{color: subjectColor,}} /></span> */}
        </div>
      </div>
    </div>
  )
}