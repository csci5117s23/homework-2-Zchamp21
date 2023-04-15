import styles from '../../styles/TodoItems.module.css';

export default function Today() {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let today = new Date();
  let weekday = today.getDay();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  let todayStr = `${days[weekday]}, ${months[month]} ${day}, ${year}`;

  return (
    <div className={styles.todayDiv}>
      <h1>
        <span>Today's Date: </span>
        <span className={styles.todaysDate}>{todayStr}</span>
      </h1>
    </div>
  );
}