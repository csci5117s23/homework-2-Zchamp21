
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {Datastore, app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';

const todoItemsYup = object({
  // user_id: string().required(),
  title: string().required(),
  description: string(),
  subject: string().required(),
  subjectColor: string().required(),
  dueDate: date().required(),
  isDone: boolean().default(false)
});

const subjectsYup = object({
  title: string().required(),
  color: string().required(),
  author: string().required()
});

// TODO: Make sure this still works past midnight
async function getUpcoming(req, res) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  // today = today.toLocaleString("en-US", {timeZone: "America/Chicago"});

  // let year = today.getFullYear();
  // let month = today.getMonth();
  // let day = today.getDate();
  // if (month < 10) {
  //   month = `0${month}`;
  // }
  // if (day < 10) {
  //   day = `0${day}`;
  // }
  // let todayStr = `${year}-${month}-${day}`;
  // let newDate = new Date(todayStr);
  // today.setHours(0, 0, 0, 0);
  // day-1 because for some reason, without that, it is a day off.
  // today = new Date(year, month, day-1, 0, 0, 0, 0);
  // let newDate = new Date(today.toISOString());
  // let utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  const conn = await Datastore.open();
  const query = {$and: [{"dueDate": {$gte: today.toISOString()}}, {"isDone": false}]};
  // const query = {$and: [{"dueDate": newDate}, {"isDone": false}]};
  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}

async function getOverdue(req, res) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  // today = today.toLocaleString("en-US", {timeZone: "America/Chicago"});
  // let utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const conn = await Datastore.open();
  const query = {$and: [{"dueDate": {$lt: today.toISOString()}}, {"isDone": false}]};
  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res); 
}

async function getDone(req, res) {
  const conn = await Datastore.open();
  const query = {"isDone": true};
  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}

// async function deleteOne(req, res) {
//   const conn = await Datastore.open();
//   const query = {
//     "_id": {$exists: false}
//   }
//   const options = {
//     filter: query
//   }
//   const data = await conn.removeMany('todoItems', options);
//   res.json(data);
// }
// app.delete("/deleteOne", deleteOne);

async function deleteSubjects(req, res) {
  const conn = await Datastore.open();
  const query = {
    "_id": {$exists: false}
  };
  const options = {
    filter: query
  }
  const data = await conn.removeMany('subjects', options);
  res.json(data);
}
app.delete("/deleteSubjects", deleteSubjects)

app.get("/done", getDone);

app.get("/upcoming", getUpcoming);

app.get("/overdue", getOverdue);

app.get("/test", (req, res) => {
  res.json({result: "you did it!"});
});

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {
  todoItems: todoItemsYup, 
  subjects: subjectsYup
});

// bind to serverless runtime
export default app.init();
