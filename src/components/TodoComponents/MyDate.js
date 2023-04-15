import styles from '../../styles/TodoItems.module.css';

export default function MyDate({ date, isOverdue }) {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let newDate = new Date(date);

  let month = newDate.getUTCMonth();
  let day = newDate.getUTCDate();
  let year = newDate.getUTCFullYear();

  let dateStr = `${months[month]} ${day}, ${year}`;

  let myStyle = {};
  (isOverdue ? (
    myStyle = {color: 'red'}
  ) : (
    myStyle = {color: 'black'}
  ));

  return (
    <span className={styles.date} style={myStyle}>{dateStr}</span>
  );
}