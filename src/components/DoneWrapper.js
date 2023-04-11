const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useState, useEffect } from 'react';
import DoneItemsList from './DoneItemsList';

export default function DoneWrapper() {
  const DONE_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/done';
  const API_ENDPOINT='https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  const [loading, setLoading] = useState(true);
  const [doneTasks, setDoneTasks] = useState([]);

  const [incompleteTask, setIncompleteTask] = useState(['', false]);
  const [incompleteTracker, setIncompleteTracker] = useState(true);

  useEffect(() => {
    const markIncomplete = async () => {
      if (incompleteTask[0]) {
        try {
          const response = await fetch(backend_base + `/todoItems/${incompleteTask[0]}`, {
            'method': 'PATCH',
            'headers': {
              'x-apikey': API_KEY,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({isDone: false})
          });
          const result = await response.json();
          console.log('Success: ', result);

          // Swap the value of incompleteTracker to indicate that a new element
          // has been marked as incomplete, so we can re-render the done list.
          setIncompleteTracker(!incompleteTracker);
        } catch(error) {
          console.error("Error: ", error);
        }
      }
    }
    markIncomplete();
  }, [incompleteTask]);

  useEffect(() => {
    const getDoneTasks = async () => {
      try {
        const response = await fetch(backend_base + '/done', {
          'method': 'GET',
          'headers': {
            'x-apikey': API_KEY
          }
        });
        const data = await response.json();
        setDoneTasks(data);
        setLoading(false);
      } catch(error) {
        console.error('Error: ', error);
      }
    }
    getDoneTasks();
  }, [incompleteTracker]);

  // function setComplete() {
  //   console.log("Clicking...");
  // }

  function handleComplete(id, completionStatus) {
    setIncompleteTask([id, completionStatus]);
  }

  let done = <div>LOADING DONE TASKS...</div>
  if (!loading) {
    done = <DoneItemsList tasks={doneTasks} setIncompleteTask={handleComplete}></DoneItemsList>
  }

  return (
    <>
      {done}
    </>
  )
}