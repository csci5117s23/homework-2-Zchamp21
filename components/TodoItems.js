import TodoItemsList from './TodoItemsList.js';
import React, { useState } from 'react';
import styles from '../styles/TodoItems.module.css';
import Today from './Today.js';
import AddTask from './AddTask.js';
import OverdueItemsList from './OverdueItemsList.js';
import Form from './Form.js';

export default function TodoItems({ topFormVisible, bottomFormVisible, cancelTopForm, toggleBottomForm }) {
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  function addTask(newTask) {
    setUpcomingTasks(upcomingTasks.concat(newTask));
  }
  
  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <Form isVisible={topFormVisible} cancelForm={cancelTopForm} addTask={addTask}></Form>
      <Today></Today>
      <OverdueItemsList></OverdueItemsList>
      <TodoItemsList tasks={upcomingTasks}></TodoItemsList>
      <AddTask formVisible={bottomFormVisible} showForm={toggleBottomForm}></AddTask>
      <Form isVisible={bottomFormVisible} cancelForm={toggleBottomForm} addTask={addTask}></Form>
    </div>
  );
}

