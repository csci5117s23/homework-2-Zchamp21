import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from '../styles/TodoItems.module.css';

export default function AddTask({ formVisible, showForm }) {
  return (!formVisible ? (
    <div className={styles.addTaskDiv}>
      <span className={styles.addTaskSpan} onClick={showForm}>
        <span className={styles.addTaskButton}><FontAwesomeIcon icon={faPlus} /></span>
        &nbsp;&nbsp;<span className={styles.addTask}>Add Task</span>
      </span>
    </div>
  ) : (
    <></>
  ));
}