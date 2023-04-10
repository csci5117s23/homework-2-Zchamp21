import TodoItemsList from './TodoItemsList.js';
import React, { useEffect, useState } from 'react';
import styles from '../styles/TodoItems.module.css';
import Today from './Today.js';
import AddTask from './AddTask.js';
import OverdueItemsList from './OverdueItemsList.js';
import Form from './Form.js';
import TodoListWrapper from './TodoListWrapper.js';

export default function TodoItems({ topFormVisible, bottomFormVisible, toggleTopForm, toggleBottomForm }) {
  const API_ENDPOINT = 'https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  // const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [allTasks, setAllTasks] = useState(null);
  // const [subjects, setSubjects] = useState(null);
  const [nextTask, setNextTask] = useState(null);
  const [uploadedTask, setUploadedTask] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getAllTasks = async () => {
  //     try {
  //       const response = await fetch(API_ENDPOINT, {
  //         'method': 'GET',
  //         'headers': {
  //           'x-apikey': API_KEY
  //         }
  //       });
  //       const data = await response.json();
  //       setUpcomingTasks(data);
  //       setLoading(false);
  //     } catch(error) {
  //       console.error('Error: ', error);
  //     }
  //   }
  //   getAllTasks();
  // }, []);

  useEffect(() => {
    const addNewTask = async () => {
      if (nextTask) {
        try {
          const response = await fetch(API_ENDPOINT, {
            'method': 'POST',
            'headers': {
              'x-apikey': API_KEY,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify(nextTask)
          });

          const result = await response.json();
          console.log('Success: ', result);
          // Update the state so that we can update the page in real time
          // without performing another get request.
          setUploadedTask(result);
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }
    addNewTask();
  }, [nextTask]);

  // useEffect(() => {
  //   const fetchSubjects = async () => {
  //     console.log('retrieving subjects')
  //     try {
  //       const response = await fetch(API_ENDPOINT, {
  //         'method': 'GET',
  //         'headers': {'x-apikey': API_KEY}
  //       });
  //       const data = await response.json();
  //       setSubjects(data);
  //       setLoading(false);

  //       // setSubjectList(subjects.map(
  //       //   (subject) => <option value={subject._id}>{subject.title}</option>
  //       // ));
  //     } catch(error) {
  //       console.log('Error: ', error);
  //     }
  //   }
  //   fetchSubjects();
  // }, []);

  function addTask(newTask) {
    setNextTask(newTask);
    // console.log(JSON.stringify(nextTask));
  }
  
  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <Form isVisible={topFormVisible} cancelForm={toggleTopForm} addTask={addTask}></Form>
      <Today></Today>
      <TodoListWrapper uploadedTask={uploadedTask}></TodoListWrapper>
      {/* <OverdueItemsList></OverdueItemsList>
      <TodoItemsList tasks={upcomingTasks}></TodoItemsList> */}
      <AddTask formVisible={bottomFormVisible} showForm={toggleBottomForm}></AddTask>
      <Form isVisible={bottomFormVisible} cancelForm={toggleBottomForm} addTask={addTask}></Form>
    </div>
  );
}

