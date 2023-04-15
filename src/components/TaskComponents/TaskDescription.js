const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import styles from '../../styles/IndividualTask.module.css';

export default function TaskDescription({ id, description }) {
  const [isEditing, setIsEditing] = useState(false);
  const [curDescription, setCurDescription] = useState(description);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function showEdit() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    const updateDescription = async () => {
      if (curDescription != description) {
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
                description: curDescription
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
    updateDescription();
  }, [isLoaded, curDescription]);

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