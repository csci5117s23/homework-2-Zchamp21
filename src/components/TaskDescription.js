import { useState, useEffect } from "react";
import styles from '../styles/IndividualTask.module.css';

export default function TaskDescription({ id, description }) {
  const TODO_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  const [isEditing, setIsEditing] = useState(false);
  const [curDescription, setCurDescription] = useState(description);

  function showEdit() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    const updateDescription = async () => {
      if (curDescription != description) {
        try {
          const response = await fetch(TODO_API_ENDPOINT + `/${id}`, {
            'method': 'PATCH',
            'headers': {
              'x-apikey': API_KEY,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
              description: curDescription
            })
          });
          const result = await response.json();
          console.log('Success: ', result);
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    updateDescription();
  }, [curDescription]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    setCurDescription(formJson.description);

    setIsEditing(false);
    e.target.reset();
  }

  return (isEditing ? (
    <div className={StyleSheet.descriptionFormDiv}>
      <form onSubmit={handleSubmit}>
        <textarea className={styles.descriptionInput} id='description' name='description' required defaultValue={curDescription}></textarea>
        <br></br>
        <button className={`${styles.updateDescriptionButton} pure-button pure-button-primary`} type='submit'>Update</button>
        <button className={`${styles.updateDescriptionButton} pure-button`} onClick={showEdit}>Cancel</button>
      </form>
    </div>
  ) : (
    <div className={`${styles.descriptionDiv} pure-g`}>
      <div className='pure-u-21-24'><span className={styles.description}>{curDescription}</span></div>
      <div className='pure-u-3-24'><span  className={styles.editDescription} onClick={showEdit}>Edit</span></div>
    </div>
  ));
}