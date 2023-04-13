const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import TodoItemsList from './TodoItemsList';
import OverdueItemsList from './OverdueItemsList';

export default function SubjectTodosWrapper({ subjId, uploadedTask, subjectDeleteTracker }) {
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingOverdue, setLoadingOverdue] = useState(true);
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
    const getAllTasks = async () => {
      console.log('getting all tasks again');
      setTracker(0);
      if (!tracker) {
        try {
          console.log('getting all tasks');
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
            console.log('all tasks after useeffect: ', allTasks);
            setLoadingTasks(false);
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      }
      console.log('done getting tasks again');
      console.log('tasks: ', allTasks);
    }
    getAllTasks();
  }, [isLoaded]);

  useEffect(() => {
    const updateTasks = () => {
      if (allTasks) {
        let mutableAllTasks = [...allTasks];
        const modifiedTasks = mutableAllTasks.filter(task => task.subjectId === subjectDeleteTracker);
        console.log('modified tasks: ', modifiedTasks);
        for (let task of modifiedTasks) {
          let taskIndex = mutableAllTasks.indexOf(task);
          task.subject = "Default Subject";
          task.subjectColor = "slategrey";
          task.subjectId = "default";
          console.log('updated task: ', task);
          mutableAllTasks[taskIndex] = task;
          // mutableAllTasks[taskIndex] = task;
        }
        console.log('mutable all tasks: ', mutableAllTasks);
        setAllTasks(mutableAllTasks);
        setTracker(0);
        console.log('all tasks after mutable update: ', allTasks);
      }
    }
    updateTasks();
  }, [subjectDeleteTracker]);

  useEffect(() => {
    const updateTasks = () => {
      if (allTasks) {
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
        // console.log('mutable all tasks after sort: ', mutableAllTasks);
        setAllTasks(mutableAllTasks);
        setTracker(0);
      }
    }
    updateTasks();
  }, [uploadedTask]);

  useEffect(() => {
    const updateTasks = () => {
      if (allTasks) {
        let mutableAllTasks = [...allTasks];
        const completedTask = mutableAllTasks.filter(task => task._id === completeTask[0]);
        console.log('completed task: ', completedTask);
        let taskIndex = mutableAllTasks.indexOf(completedTask[0]);
        mutableAllTasks.splice(taskIndex, 1);
        setAllTasks(mutableAllTasks);
        setTracker(0);
      }
    }
    updateTasks();
  }, [completeTracker]);

  function handleComplete(id, completionStatus) {
    setCompleteTask([id, completionStatus]);
  }

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
  let dateStr = `${year}-${month.toString()}-${day.toString()}`;

  if (loadingTasks) {
    return <div>LOADING TASKS...</div>
  } else {
    // console.log('all tasks: ', allTasks);
    if (!tracker) {
      console.log('Getting overdue/upcoming tasks');
      let customUpcoming = [];
      let customOverdue = [];

      let customAllTasks = allTasks;

      console.log('all tasks: ', allTasks);
      for (let task of allTasks) {
        let taskDateArr = task.dueDate.split('T');
        if (taskDateArr[0] < dateStr) {
          customOverdue = customOverdue.concat(task);
        } else if (taskDateArr[0] >= dateStr) {
          customUpcoming = customUpcoming.concat(task);
        }
      }
      console.log('upcoming tasks in set upcoming tasks: ', upcomingTasks);
      console.log('overdue tasks in set overdue tasks: ', overdueTasks);
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