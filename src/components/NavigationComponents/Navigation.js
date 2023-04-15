import FilterList from './FilterList.js';
import Subjects from './Subjects.js';
import styles from '../../styles/Filters.module.css';

export default function Navigation({ curPage, subjects, setSubjects, loading, setSubjectDeleteTracker, curSubjId }) {
  return (
    <div className={`${styles.navigation} pure-u-1 pure-u-lg-1-5`}>
      <FilterList curPage={curPage}></FilterList>
      <Subjects 
        curPage={curPage}
        subjects={subjects}
        setSubjects={setSubjects}
        loading={loading}
        setSubjectDeleteTracker={setSubjectDeleteTracker}
        curSubjId={curSubjId}
      ></Subjects>
    </div>
  )
}