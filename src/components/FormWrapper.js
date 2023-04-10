

// TODO: Finish this wrapper.
export default function FormWrapper() {

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    let subj = findSingleSubject(formJson.subject);
    console.log('subj: ', subj);
    console.log('color: ', subj.color);
    console.log('title: ', subj.title);
    
    console.log('subject data: ', curSubject);

    let newTask = {
      title: formJson.title,
      description: formJson.description,
      subject: subj.title,
      subjectColor: subj.color,
      dueDate: formJson.date,
      isDone: false
    };
    addTask(newTask);
    setId(id + 1);

    e.target.reset();
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
  
  let todayStr = `${yearStr}-${monthStr}-${dayStr}`;
  return todayStr;
}

async function getAllSubjects() {


  try {
    const response = await fetch(API_ENDPOINT, {
      'method': 'GET',
      'headers': {'x-apikey': API_KEY}
    });
    const data = await response.json();

    return data;
  } catch(error) {
    console.error('Error: ', error);
  }
}