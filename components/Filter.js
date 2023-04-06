import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Filters.module.css';
import Link from 'next/link';
import React from 'react';


export default function Filter({ name, curPage }) {
  let icon;
  let link = '';
  let myStyle = {};
  if (name === 'To Do\'s') {
    icon = <FontAwesomeIcon icon={faClipboardList} style={{color: "#000000",}} />
    link = 'todos';

    if (curPage === 'todos') {
      myStyle = {backgroundColor: '#E8E8E8'}
    }
  } else if (name === 'Done') {
    icon = <FontAwesomeIcon icon={faClipboardCheck} style={{color: "#089b21",}} />
    link = 'done';
    
    if (curPage === 'done') {
      myStyle = {backgroundColor: '#E8E8E8'}
    }
  }

  return (
    <>
      <div className={styles.filter}>
        {/* <div className={styles.filterLinks}> */}
          <Link href={link} className={styles.filterLinks}
            style={
              myStyle
            }
          >
            {icon} {name}
          </Link>
        {/* </div> */}
      </div>
    </>
  )
}