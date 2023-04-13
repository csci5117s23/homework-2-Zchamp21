
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {Datastore, app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

const todoItemsYup = object({
  // user_id: string().required(),
  title: string().required(),
  description: string(),
  subject: string().required(),
  subjectColor: string().required(),
  subjectId: string(),
  dueDate: date().required(),
  isDone: boolean().default(false),
  user: string().required()
});

const subjectsYup = object({
  title: string().required(),
  color: string().required(),
  user: string().required()
});

async function getAllTasks(req, res) {
  let userId = req.user_token.sub;

  const conn = await Datastore.open();
  const query = {$and: [{"isDone": false}, {"user": userId}]};

  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}
app.get('/getAllTasks', getAllTasks);

async function getAllSubjectTasks(req, res) {
  let userId = req.user_token.sub;
  let subjId = req.query.subjId;

  const conn = await Datastore.open();
  const query = {$and: [{"isDone": false}, {"subjectId": subjId}, {"user": userId}]};

  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}
app.get('/getAllSubjectTasks', getAllSubjectTasks);

async function getDoneSubjectTasks(req, res) {
  let userId = req.user_token.sub;
  let subjId = req.query.subjId;

  const conn = await Datastore.open();
  const query = {$and: [{"isDone": true}, {"subjectId": subjId}, {"user": userId}]};

  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}
app.get('/getDoneSubjectTasks', getDoneSubjectTasks);

// TODO: Make sure this still works past midnight
async function getUpcoming(req, res) {
  let userId = req.user_token.sub;

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let year = today.getUTCFullYear();
  let month = today.getUTCMonth()+1;
  let day = today.getUTCDate();
  let monthStr = '';
  let dayStr = '';
  if (month < 10) {
    monthStr = `0${month}`;
  } else {
    monthStr = month.toString();
  }

  if (day < 10) {
    dayStr = `0${day}`;
  } else {
    dayStr = day.toString();
  }

  let todayStr = `${year}/${monthStr}/${dayStr}`;
  let newToday = new Date(todayStr);
  // today = today.toLocaleString("en-US", {timeZone: "America/Chicago"});

  // let newDate = new Date(today.toISOString());
  // let utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  const conn = await Datastore.open();
  // const query = {$and: [{"dueDate":{$gte:{"$date":new Date()}}}, {"isDone": false}, {"user": userId}]};
  const query = {$and: [{"dueDate": {$gte: newToday.toISOString()}}, {"isDone": false}, {"user": userId}]};
  // const query = {$and: [{"dueDate": newDate}, {"isDone": false}]};
  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}

async function getOverdue(req, res) {
  let userId = req.user_token.sub;

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let year = today.getUTCFullYear();
  let month = today.getUTCMonth()+1;
  let day = today.getUTCDate();
  let monthStr = '';
  let dayStr = '';
  if (month < 10) {
    monthStr = `0${month}`;
  } else {
    monthStr = month.toString();
  }

  if (day < 10) {
    dayStr = `0${day}`;
  } else {
    dayStr = day.toString();
  }

  let todayStr = `${year}/${monthStr}/${dayStr}`;
  let newToday = new Date(todayStr);
  console.log('new today in backend: ', newToday);

  // today = today.toLocaleString("en-US", {timeZone: "America/Chicago"});
  // let utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const conn = await Datastore.open();
  // const query = {$and: [{"dueDate":{$lt:{"$date":new Date()}}}, {"isDone": false}, {"user": userId}]};
  const query = {$and: [{"dueDate": {$lt: newToday.toISOString()}}, {"isDone": false}, {"user": userId}]};
  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res); 
}

async function getDone(req, res) {
  let userId = req.user_token.sub;
  const conn = await Datastore.open();
  const query = {$and: [{"isDone": true}, {"user": userId}]};
  const options = {
    filter: query,
    sort: {"dueDate": 1}
  }
  conn.getMany('todoItems', options).json(res);
}

async function updateTodos(req, res) {
  let subjId = req.body.origSubjId;
  let userId = req.user_token.sub;

  const conn = await Datastore.open();
  const options = {
    filter: {$and: [{"subjectId": subjId}, {"user": userId}]}
  };
  const doc = {
    $set: {subject: req.body.subject, subjectColor: req.body.subjectColor, subjectId: req.body.subjectId}
  };

  const data = await conn.updateMany('todoItems', doc, options);
  res.json(data);
}
app.patch('/updateTodos', updateTodos);

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

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  }
}
app.use(userAuth);

app.use('/upcoming', (req, res, next) => {
  if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
});

app.use('/overdue', (req, res, next) => {
  if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
})

app.use('/subjects', (req, res, next) => {
  if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
});

app.use('/todoItems', (req, res, next) => {
  if (req.method === "POST") {
    req.body.user = req.user_token.sub;
  } else if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
});

// TODO: Do something similar to this for /subjects/:id.
app.use('/todoItems/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub;

  const conn = await Datastore.open();
  try {
    const task = await conn.getOne('todoItems', id);
    if (task.user != userId) {
      res.status(403).end();
      return;
    }
  } catch (e) {
    console.error('Error: ', e);
    res.status(404).end(e);
    return;
  }

  next();
});

// app.use('/upcoming', (req, res, next) => {
//   if (req.method === "GET") {
//     req.query.user = req.user_token.sub;
//   }
//   next();
// })

// Use Crudlify to create a REST API for any collection
crudlify(app, {
  todoItems: todoItemsYup, 
  subjects: subjectsYup
});

// bind to serverless runtime
export default app.init();
