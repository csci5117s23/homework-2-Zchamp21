const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import TodoItemsList from '../TodoComponents/TodoItemsList';
import OverdueItemsList from '../TodoComponents/OverdueItemsList';

export default function SubjectTodosWrapper({ subjId, uploadedTask, subjectDeleteTracker }) {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  const [loadingTasks, setLoadingTasks] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const [tracker, setTracker] = useState(0);

  const [completeTask, setCompleteTask] = useState(['', false]);
  const [completeTracker, setCompleteTracker] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const updateCompletionStatus = async () => {
      // Only run if there is a task to be completed.
      if (completeTask[0]) {
        try {
          if (userId) {
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(backend_base + `/todoItems/${completeTask[0]}`, {
              'method': 'PATCH',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify({
                isDone: completeTask[1]
              })
            });
            const results = await response.json();
            console.log('Success: ', results);
            setCompleteTracker(!completeTracker);
          }
        } catch(error) {
          console.error('Error: ', error);
        }
      }
    }
    updateCompletionStatus();
  }, [isLoaded, completeTask]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/getAllSubjectTasks?subjId=${subjId}`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });
          const data = await response.json();
          setAllTasks(data);
          setLoadingTasks(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    getAllTasks();
  }, [isLoaded]);

  useEffect(() => {
    // Update all tasks that have a deleted subject.
    const updateTasks = () => {
      if (subjectDeleteTracker) {
        let mutableAllTasks = [...allTasks];
        const modifiedTasks = mutableAllTasks.filter(task => task.subjectId === subjectDeleteTracker);
        for (let task of modifiedTasks) {
          let taskIndex = mutableAllTasks.indexOf(task);
          task.subject = "Default Subject";
          task.subjectColor = "slategrey";
          task.subjectId = "default";
          mutableAllTasks[taskIndex] = task;
        }
        setAllTasks(mutableAllTasks);
        setTracker(0);
      }
    }
    updateTasks();
  }, [subjectDeleteTracker]);

  useEffect(() => {
    // Update allTasks with a new task, then sort the new list by due date.
    const updateTasks = () => {
      if (uploadedTask) {
        let mutableAllTasks = [...allTasks];
        mutableAllTasks = mutableAllTasks.concat(uploadedTask);
        mutableAllTasks.sort((a, b) => {
          if (a.dueDate < b.dueDate) {
            return -1;
          } 
          if (a.dueDate > b.dueDate) {
            return 1;
          }
          return 0;
        });
        setAllTasks(mutableAllTasks);
        setTracker(0);
      }
    }
    updateTasks();
  }, [uploadedTask]);

  useEffect(() => {
    // Remove a completed task from the allTasks state.
    const updateTasks = () => {
      let mutableAllTasks = [...allTasks];
      const completedTask = mutableAllTasks.filter(task => task._id === completeTask[0]);
      let taskIndex = mutableAllTasks.indexOf(completedTask[0]);
      mutableAllTasks.splice(taskIndex, 1);
      setAllTasks(mutableAllTasks);
      setTracker(0);
    }
    updateTasks();
  }, [completeTracker]);

  function handleComplete(id, completionStatus) {
    setCompleteTask([id, completionStatus]);
  }

  function calcToday() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let year = today.getUTCFullYear();
    let month = today.getUTCMonth() + 1;
    let day = today.getUTCDate();
    
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month.toString()}-${day.toString()}`;
  }

  let dateStr = calcToday();

  if (loadingTasks) {
    return <div>LOADING TASKS...</div>
  } else {
    // Use tracker to determine when the update the upcomingTasks and overdueTasks state variables.
    // Without this tracker, this would get run on every re-render, which will be an infinite loop.
    if (!tracker) {
      let customUpcoming = [];
      let customOverdue = [];

      for (let task of allTasks) {
        let taskDateArr = task.dueDate.split('T');
        if (taskDateArr[0] < dateStr) {
          customOverdue = customOverdue.concat(task);
        } else if (taskDateArr[0] >= dateStr) {
          customUpcoming = customUpcoming.concat(task);
        }
      }
      setUpcomingTasks(customUpcoming);
      setOverdueTasks(customOverdue);

      setTracker(1);
    }

    return (
      <>
        <OverdueItemsList tasks={overdueTasks} setCompleteTask={handleComplete}></OverdueItemsList>
        <TodoItemsList tasks={upcomingTasks} setCompleteTask={handleComplete}></TodoItemsList>
      </>
    );
  }
}