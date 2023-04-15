import Filter from './Filter.js';
import styles from '../../styles/Filters.module.css';

export default function FilterList({ curPage }) {
  // This will always be hard-coded.
  let filters = [
    {name: 'To Do\'s'}, {name: 'Done'}
  ];
  let filterList = filters.map(
    (filter) => 
      <Filter 
        key={filter.name}
        name={filter.name}
        curPage={curPage}
      ></Filter>
  );

  return (
    <div className={styles.filterDiv}>{filterList}</div>
  );
}