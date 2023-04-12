import FilterList from './FilterList.js';
import styles from '../styles/Filters.module.css';
import React, { useState, useEffect } from 'react';
import Subjects from './Subjects.js';

export default function Navigation({ curPage, uploadedSubject, setUploadedSubject, subjects, setSubjects, loading }) {
  // const [addSubjectFormVisible, setAddSubjectFormVisible] = useState(false);

  // function toggleSubjectForm() {
  //   setAddSubjectFormVisible(!addSubjectFormVisible);
  // }

  return (
    <div className={`${styles.navigation} pure-u-1 pure-u-lg-1-5`}>
      <FilterList curPage={curPage}></FilterList>
      <Subjects 
        uploadedSubject={uploadedSubject}
        setUploadedSubject={setUploadedSubject}
        curPage={curPage}
        subjects={subjects}
        setSubjects={setSubjects}
        loading={loading}
      ></Subjects>
    </div>
  )
}