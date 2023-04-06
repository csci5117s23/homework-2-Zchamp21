import Header from '../components/Header.js';
import Navigation from '../components/Navigation.js';
import styles from '../styles/Todos.module.css';
import filterStyles from '../styles/Filters.module.css';
import React, { useState } from 'react';
import TodoItems from '../components/TodoItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';

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
        page='todos'
        showTopForm={toggleTopForm}
      ></Header>
      <div className='pure-g'>
        <Navigation curPage='todos'></Navigation>
        <TodoItems 
          topFormVisible={topFormVisible} 
          bottomFormVisible={bottomFormVisible} 
          cancelTopForm={toggleTopForm}
          toggleBottomForm={toggleBottomForm}>
        </TodoItems>
      </div>
    </>
  );
}