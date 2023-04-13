const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MyDate from '@/components/MyDate';
import Header from '@/components/Header';
import IndividualTask from '@/components/IndividualTask';
import { useAuth } from '@clerk/nextjs';

export default function Task() {
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';
  // console.log('props: ', props);
  const [curTask, setCurTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [curTaskDone, setCurTaskDone] = useState(false);
  const router = useRouter();
  let { id } = router.query;

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  // if (!id) {} // do nothing
  // console.log('id: ', id);
  // if (id) {
  //   setTaskId(id);
  // }

  // return <p>Task: {id}</p>

  // if (router.isFallback) {
  //   return <h1>LOADING...</h1>
  // }

  useEffect(() => {
    const getIndividualTask = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/todoItems/${id}`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });
          const data = await response.json();
          setCurTask(data);
          setCurTaskDone(data.isDone);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    getIndividualTask();
  }, [isLoaded, router]);

  useEffect(() => {
    const changeCompleteStatus = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/todoItems/${id}`, {
            'method': 'PATCH',
            'headers': {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({isDone: curTaskDone})
          });
          const result = await response.json();
          console.log('Success: ', result);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    changeCompleteStatus();
  }, [isLoaded, curTaskDone]);

  function updateIsDone() {
    setCurTaskDone(!curTaskDone);
  }

  return (
    <>
      <Header
        username='Zach'
        page='individualTask'
        showTopForm=''
      ></Header>
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <IndividualTask task={curTask} setComplete={updateIsDone}></IndividualTask>
      )}
    </>
  );
}

async function getTaskData() {
  // const API_ENDPOINT='https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  try {
    const response = await fetch(backend_base + '/todoItems', {
      'method': 'GET',
      'headers': {
        'x-apikey': API_KEY
      }
    });
    const data = await response.json();
    // console.log('Getting data: ', data);
    return data;
    // setTask(data);
    // setLoading(false);
  } catch(error) {
    console.error('Error: ', error);
    return null;
  }
}

// export async function getStaticProps(context) {
//   try {
//     const taskID = context.params?.id;
//     console.log(taskID);
//     const data = await getTaskData();
//     const foundTask = data.find((task) => taskID === task._id);
//     console.log('id: ', taskID);
//     console.log('props data: ', data);
//     console.log('found task: ', foundTask);

//     // This is the task that will actually get sent as props. I do this because
//     // I don't want any author data sent.
//     let task = {
//       _id: foundTask._id,
//       title: foundTask.title,
//       description: foundTask.description,
//       subject: foundTask.subject,
//       subjectColor: foundTask.subjectColor,
//       dueDate: foundTask.dueDate,
//       isDone: foundTask.isDone
//     }

//     console.log('updated task: ', task);

//     // if (!foundTask) {
//     //   return 
//     // }

//     return {
//       props: {
//         desiredTask: task
//       }
//     }
//   } catch (error) {
//     console.error('Error: ', error);
//   }
// }

// export async function getStaticPaths() {
//   const data = await getTaskData();
//   const paths = data.map(
//     (task) => (
//       {params: {
//         id: task._id
//       }}
//     )
//   );

//   console.log('paths: ', paths);

//   return {
//     paths: paths,
//     fallback: false
//   };
// }

// export async function getStaticPaths() {
//   const API_ENDPOINT='https://backend-8s2l.api.codehooks.io/dev/todoItems';
//   const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';
//   try {
//     const response = await fetch(API_ENDPOINT, {

//     })
//   } catch(error) {
//     console.log('Error: ', error);
//   } 
// }

// export async function getStaticProps({ params }) {
//   // TODO: Use fetch to retrieve a specific to do task. Don't need useEffect.
//   return {
//     props: {
//       taskData
//     }
//   }
// }