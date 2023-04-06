import Header from '../components/Header.js';
import Navigation from '../components/Navigation.js';
import styles from '../styles/Todos.module.css';
import filterStyles from '../styles/Filters.module.css';
import React, { useState } from 'react';
import TodoItems from '../components/TodoItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';
import DoneItems from '../components/DoneItems.js';

export default function Todos() {
  const [topFormVisible, setTopFormVisible] = useState(false);
  const [bottomFormVisible, setBottomFormVisible] = useState(false);

  function toggleTopForm() {
    setTopFormVisible(!topFormVisible);
  }

  function toggleBottomForm() {
    setBottomFormVisible(!bottomFormVisible);
  }

  // TODO: Update the username to be dependent on who is logged in.
  return (
    <>
      <Header 
        username='Zach Champlin'
        page='done'
        showTopForm=''
      ></Header>
      <div className='pure-g'>
        <Navigation curPage='done'></Navigation>
        <DoneItems></DoneItems>
      </div>
    </>
  );
}