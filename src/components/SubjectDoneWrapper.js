const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import TodoItemsList from './TodoItemsList';
import OverdueItemsList from './OverdueItemsList';
import DoneItemsList from './DoneItemsList';

export default function SubjectDoneWrapper({ subjId, subjectDeleteTracker }) {
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [doneTasks, setDoneTasks] = useState([]);
  const [tracker, setTracker] = useState(0);

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

  // async function getAllTasks() {
  //   setTracker(0);
  //   if (!tracker) {
  //     try {
  //       if (userId) {
  //         const token = await getToken({ template: "codehooks" });

  //         const response = await fetch(backend_base + `/getAllSubjectTasks?subjId=${subjId}`, {
  //           'method': 'GET',
  //           'headers': {
  //             'Authorization': 'Bearer ' + token
  //           }
  //         });
  //         const data = await response.json();
  //         setAllTasks(data);
  //         setLoadingTasks(false);
  //       }
  //     } catch (error) {
  //       console.error('Error: ', error);
  //     }
  //   } 
  // }
  // getAllTasks();

  useEffect(() => {
    const getDoneTasks = async () => {
      console.log('getting all tasks again');
      // setTracker(0);
      // if (!tracker) {
      try {
        console.log('getting all tasks');
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
          console.log('all tasks after useeffect: ', doneTasks);
          setLoadingTasks(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
      // }
      console.log('done getting tasks again');
      console.log('tasks: ', doneTasks);
    }
    getDoneTasks();
  }, [isLoaded]);

  useEffect(() => {
    const updateTasks = () => {
      if (doneTasks) {
        let mutableDoneTasks = [...doneTasks];
        const modifiedTasks = mutableDoneTasks.filter(task => task.subjectId === subjectDeleteTracker);
        console.log('modified tasks: ', modifiedTasks);
        for (let task of modifiedTasks) {
          let taskIndex = mutableDoneTasks.indexOf(task);
          task.subject = "Default Subject";
          task.subjectColor = "slategrey";
          task.subjectId = "default";
          console.log('updated task: ', task);
          mutableDoneTasks[taskIndex] = task;
          // mutableAllTasks[taskIndex] = task;
        }
        console.log('mutable all tasks: ', mutableDoneTasks);
        setDoneTasks(mutableDoneTasks);
        // setTracker(0);
        console.log('all tasks after mutable update: ', doneTasks);
      }
    }
    updateTasks();
  }, [subjectDeleteTracker]);

  useEffect(() => {
    const updateTasks = () => {
      if (doneTasks) {
        let mutableDoneTasks = [...doneTasks];
        const incompletedTask = mutableDoneTasks.filter(task => task._id === incompleteTask[0]);
        console.log('completed task: ', incompletedTask);
        let taskIndex = mutableDoneTasks.indexOf(incompletedTask[0]);
        mutableDoneTasks.splice(taskIndex, 1);
        setDoneTasks(mutableDoneTasks);
        // setTracker(0);
      }
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

  // let upcoming = <div>LOADING UPCOMING TASKS...</div>
  // let overdue = <div>LOADING OVERDUE TASKS...</div>
  // if (!loadingUpcoming) {
  //   upcoming = <TodoItemsList tasks={upcomingTasks} setCompleteTask={handleComplete}></TodoItemsList>
  // }
  // if (!loadingOverdue) {
  //   overdue = <OverdueItemsList tasks={overdueTasks} setCompleteTask={handleComplete}></OverdueItemsList>
  // }

  // return (
  //   <>
  //     {overdue}
  //     {upcoming}
  //   </>
  // )
}