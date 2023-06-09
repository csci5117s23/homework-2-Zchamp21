const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { faCircleCheck as solidFaCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faCircle as hollowFaCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import styles from '../../styles/IndividualTask.module.css';

export default function TaskTitle({ id, title, subjectColor,  isDone, setComplete }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(isDone);
  const [isEditing, setIsEditing] = useState(false);
  const [curTitle, setCurTitle] = useState(title);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function handleMouseHover() {
    setIsHovering(!isHovering);
  }

  function showEdit() {
    setIsEditing(!isEditing);
  }

  function handleClick() {
    setIsClicked(!isClicked);
    setComplete();
  }

  useEffect(() => {
    const updateTitle = async () => {
      if (curTitle != title) {
        try {
          if (userId) {
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(backend_base + `/todoItems/${id}`, {
              'method': 'PATCH',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify({
                title: curTitle
              })
            });
            const result = await response.json();
            console.log('Success: ', result);
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    updateTitle();
  }, [isLoaded, curTitle])

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    setCurTitle(formJson.title);

    setIsEditing(false);
    e.target.reset();
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
    <span>{curTitle}</span>
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
      <span className={styles.titleText}>{curTitle}</span>
    );
  }

  return (isEditing ? (
    <div className={styles.titleFormDiv}>
      <form onSubmit={handleSubmit}>
        <input type='text' className={styles.titleInput} id='title' name='title' required defaultValue={curTitle}></input>
        <br></br>
        <button className={`${styles.updateTitleButton} pure-button pure-button-primary`} type='submit'>Update</button>
        <button className={`${styles.updateTitleButton} pure-button`} onClick={showEdit}>Cancel</button>
      </form>
    </div>
  ) : (
    <div className={`${styles.titleDiv} pure-g`}>
      <div className='pure-u-1-24'><span className='fa-stack'>{checkbox}</span></div>
      <div className='pure-u-20-24'><span className={styles.title}>{newTitle}</span></div>
      <div className='pure-u-3-24'><span className={styles.editTitle} onClick={showEdit}>Edit</span></div>
    </div>
  ));
}