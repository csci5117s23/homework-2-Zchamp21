const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import DoneItemsList from './DoneItemsList';

export default function DoneWrapper({ subjectDeleteTracker }) {
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

          const response = await fetch(backend_base + `/done`, {
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
  }, [isLoaded, incompleteTracker, subjectDeleteTracker]);

  function handleComplete(id, completionStatus) {
    setIncompleteTask([id, completionStatus]);
  }

  let done = <div>LOADING COMPLETED TASKS...</div>
  if (!loading) {
    done = <DoneItemsList tasks={doneTasks} setIncompleteTask={handleComplete}></DoneItemsList>
  }

  return (
    <>
      {done}
    </>
  )
}