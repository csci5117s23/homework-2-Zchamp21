const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import React, { useState, useEffect } from 'react';
import TodoItemsList from './TodoItemsList';
import OverdueItemsList from './OverdueItemsList';

export default function TodoListWrapper({ uploadedTask }) {
  const UPCOMING_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/upcoming';
  const OVERDUE_API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/overdue';
  const API_ENDPOINT='https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  // const [allTasks, setAllTasks] = useState(null);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingOverdue, setLoadingOverdue] = useState(true);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  const [completeTask, setCompleteTask] = useState(['', false]);
  const [completeTracker, setCompleteTracker] = useState(true);

  useEffect(() => {
    const updateCompletionStatus = async () => {
      // Only run if there is a task to be completed.
      if (completeTask[0]) {
        try {
          const response = await fetch(backend_base + `/todoItems/${completeTask[0]}`, {
            'method': 'PATCH',
            'headers': {
              'x-apikey': API_KEY,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
              isDone: completeTask[1]
            })
          });
          const results = await response.json();
          console.log('Success: ', results);
          setCompleteTracker(!completeTracker);
        } catch(error) {
          console.error('Error: ', error);
        }
      }
    }
    updateCompletionStatus();
  }, [completeTask]);

  useEffect(() => {
    const getUpcomingTasks = async () => {
      try {
        const response = await fetch(backend_base + '/upcoming', {
          'method': 'GET',
          'headers': {
            'x-apikey': API_KEY
          }
        });
        const data = await response.json();
        console.log('upcoming data: ', data);
        setUpcomingTasks(data);
        setLoadingUpcoming(false);
      } catch(error) {
        console.error('Error: ', error);
      }
    }
    getUpcomingTasks();
  }, [uploadedTask, completeTracker]);

  useEffect(() => {
    const getOverdueTasks = async () => {
      try {
        const response = await fetch(backend_base + '/overdue', {
          'method': 'GET',
          'headers': {
            'x-apikey': API_KEY
          }
        });
        const data = await response.json();
        console.log('overdue data: ', data);
        setOverdueTasks(data);
        setLoadingOverdue(false);
      } catch(error) {
        console.error('Error: ', error);
      }
    }
    getOverdueTasks();
  }, [completeTracker]);

  function handleComplete(id, completionStatus) {
    setCompleteTask([id, completionStatus]);
  }

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log('today: ', today.toISOString());
  let utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  console.log('utc today: ', utcToday.toISOString());

  let upcoming = <div>LOADING UPCOMING TASKS...</div>
  let overdue = <div>LOADING OVERDUE TASKS...</div>
  if (!loadingUpcoming) {
    upcoming = <TodoItemsList tasks={upcomingTasks} setCompleteTask={handleComplete}></TodoItemsList>
  }
  if (!loadingOverdue) {
    overdue = <OverdueItemsList tasks={overdueTasks} setCompleteTask={handleComplete}></OverdueItemsList>
  }

  return (
    <>
      {overdue}
      {upcoming}
    </>
  )
}