import { useAuth } from "@clerk/nextjs";
import styles from '../../styles/Todos.module.css';

export default function Form({ isVisible, cancelForm, addTask, subjects, loading, curSubjId }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  function findSingleSubject(subjId) {
    for (let subject of subjects) {
      if (subject._id === subjId) {
        return subject;
      }
    }
  }

  function calcToday() {
    // Calculate today's date in a form that is acceptable
    // in an html form value attribute.
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    let yearStr = year.toString();
    let monthStr = '';
    if (month < 10) {
      monthStr = `0${month.toString()}`;
    } else {
      monthStr = month.toString();
    }
    let dayStr = '';
    if (day < 10) {
      dayStr = `0${day.toString()}`;
    } else {
      dayStr = day.toString();
    }

    return `${yearStr}-${monthStr}-${dayStr}`;
  }
  
  let todayStr = calcToday();

  function handleSubmit(e) {
    e.preventDefault();

    document.getElementById('subject').disabled = false;

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    let subj = findSingleSubject(formJson.subject);
    
    let newDate = new Date(formJson.date.replace(/-/g, '\/'));

    let newTask = {
      title: formJson.title,
      description: formJson.description,
      subject: subj.title,
      subjectColor: subj.color,
      subjectId: subj._id,
      dueDate: newDate.toISOString(),
      isDone: false,
      user: userId
    };
    addTask(newTask);

    e.target.reset();
  }

  if (loading) {
    return (isVisible ? (
      <span className={styles.loadingSpan}>LOADING...</span>
    ) : (
      <></>
    ));
  } else {
    let subjectsList = subjects.map(
      (subject) =>
        <option key={subject._id} value={subject._id}>{subject.title}</option>
    );

    let selectSubject;
    if (curSubjId) {
      selectSubject = (
        <select name='subject' id='subject' disabled defaultValue={curSubjId}>
          <option value='none' disabled hidden>Select Subject</option>
          {subjectsList}
        </select>
      );
    } else {
      selectSubject = (
        <select name='subject' id='subject' required defaultValue='none'>
          <option value='none' disabled hidden>Select Subject</option>
          {subjectsList}
        </select>
      );
    }

    return (isVisible ? (
      <div className={styles.formDiv}>
        <form className={`${styles.addTaskForm}`} onSubmit={handleSubmit} method='post'>
          <div className={styles.formTitle}>
            <label htmlFor='title'></label>
            <input className={styles.titleInput} type='text' id='title' name='title' placeholder='Title' required></input>
          </div>
          <div className={styles.formDescription}>
            <label htmlFor='description'></label>
            <textarea className={styles.descriptionInput} id='description' name='description' placeholder='Optional Description'></textarea>
          </div>
          <div className={styles.formDateSubject}>
            <label htmlFor='date'></label>
            <input className={styles.dateInput} type='date' id='date' name='date' required defaultValue={todayStr} min={todayStr}></input>
            <label htmlFor='subject'></label>
            {selectSubject}
          </div>
          <div className={styles.formSubmit}>
            <button type='submit' className='pure-button pure-button-primary'>Add Task</button>
            <button className={`${styles.cancelButton} pure-button`} onClick={cancelForm}>Cancel</button>
          </div>
        </form>
      </div>
    ) : (
      <></>
    ));
  }
}