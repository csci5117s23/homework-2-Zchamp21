const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import DoneItemsList from '../TodoComponents/DoneItemsList';

export default function SubjectDoneWrapper({ subjId, subjectDeleteTracker }) {
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [doneTasks, setDoneTasks] = useState([]);

  const [incompleteTask, setIncompleteTask] = useState(['', false]);
  const [incompleteTracker, setIncompleteTracker] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const markIncomplete = async () => {
      // Only run if there is a task to be completed.
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
              'body': JSON.stringify({
                isDone: incompleteTask[1]
              })
            });
            const results = await response.json();
            console.log('Success: ', results);
            setIncompleteTracker(!incompleteTracker);
          }
        } catch(error) {
          console.error('Error: ', error);
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

          const response = await fetch(backend_base + `/getDoneSubjectTasks?subjId=${subjId}`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });
          const data = await response.json();
          setDoneTasks(data);
          setLoadingTasks(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    getDoneTasks();
  }, [isLoaded]);

  useEffect(() => {
    // Update all tasks that have a deleted subject.
    const updateTasks = () => {
      if (subjectDeleteTracker) {
        let mutableDoneTasks = [...doneTasks];
        const modifiedTasks = mutableDoneTasks.filter(task => task.subjectId === subjectDeleteTracker);
        for (let task of modifiedTasks) {
          let taskIndex = mutableDoneTasks.indexOf(task);
          task.subject = "Default Subject";
          task.subjectColor = "slategrey";
          task.subjectId = "default";
          mutableDoneTasks[taskIndex] = task;
        }
        setDoneTasks(mutableDoneTasks);
      }
    }
    updateTasks();
  }, [subjectDeleteTracker]);

  useEffect(() => {
    // Remove an incompleted task from the doneTasks state.
    const updateTasks = () => {
      let mutableDoneTasks = [...doneTasks];
      const incompletedTask = mutableDoneTasks.filter(task => task._id === incompleteTask[0]);
      let taskIndex = mutableDoneTasks.indexOf(incompletedTask[0]);
      mutableDoneTasks.splice(taskIndex, 1);
      setDoneTasks(mutableDoneTasks);
    }
    updateTasks();
  }, [incompleteTracker]);

  function handleComplete(id, completionStatus) {
    setIncompleteTask([id, completionStatus]);
  }

  if (loadingTasks) {
    return <div>LOADING TASKS...</div>
  } else {
    return (
      <>
        <DoneItemsList tasks={doneTasks} setIncompleteTask={handleComplete}></DoneItemsList>
      </>
    );
  }
}