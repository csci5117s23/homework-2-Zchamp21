const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useState, useEffect } from 'react';
import DoneItemsList from './DoneItemsList';
import { useAuth } from '@clerk/nextjs';

export default function DoneWrapper() {
  const DONE_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/done';
  const API_ENDPOINT='https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  const [loading, setLoading] = useState(true);
  const [doneTasks, setDoneTasks] = useState([]);

  const [incompleteTask, setIncompleteTask] = useState(['', false]);
  const [incompleteTracker, setIncompleteTracker] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const markIncomplete = async () => {
      if (incompleteTask[0]) {
        try {
          if (userId) {
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(backend_base + `/todoItems/${incompleteTask[0]}`, {
              'method': 'PATCH',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify({isDone: false})
            });
            const result = await response.json();
            console.log('Success: ', result);

            // Swap the value of incompleteTracker to indicate that a new element
            // has been marked as incomplete, so we can re-render the done list.
            setIncompleteTracker(!incompleteTracker);
          }
        } catch(error) {
          console.error("Error: ", error);
        }
      }
    }
    markIncomplete();
  }, [isLoaded, incompleteTask]);

  useEffect(() => {
    const getDoneTasks = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/done?user=${userId}`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });
          const data = await response.json();
          setDoneTasks(data);
          setLoading(false);
        }
      } catch(error) {
        console.error('Error: ', error);
      }
    }
    getDoneTasks();
  }, [isLoaded, incompleteTracker]);

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