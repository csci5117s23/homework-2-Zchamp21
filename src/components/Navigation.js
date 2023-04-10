import FilterList from './FilterList.js';
import styles from '../styles/Filters.module.css';
import React from 'react';

export default function Navigation({ curPage }) {
  return (
    <div className={`${styles.navigation} pure-u-1 pure-u-lg-1-5`}>
      <FilterList curPage={curPage}></FilterList>
    </div>
  )
}