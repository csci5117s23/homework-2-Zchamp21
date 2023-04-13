import TodoItemsList from './TodoItemsList.js';
import React, { useState } from 'react';
import styles from '../styles/TodoItems.module.css';
import Today from './Today.js';
import AddTask from './AddTask.js';
import OverdueItemsList from './OverdueItemsList.js';
import Form from './Form.js';
import DoneItemsList from './DoneItemsList.js';
import DoneWrapper from './DoneWrapper.js';

export default function DoneItems({ subjectDeleteTracker }) {
  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <DoneWrapper subjectDeleteTracker={subjectDeleteTracker}></DoneWrapper>
    </div>
  );
}

