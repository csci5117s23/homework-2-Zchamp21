import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MyDate from '@/components/MyDate';
import Header from '@/components/Header';
import IndividualTask from '@/components/IndividualTask';

export default function Task(props) {
  console.log('props: ', props);
  const router = useRouter();

  if (router.isFallback) {
    return <h1>LOADING...</h1>
  }

  return (
    <>
      <Header
        username='Zach'
        page='individualTask'
        showTopForm=''
      ></Header>
      <IndividualTask task={props.desiredTask}></IndividualTask>
    </>
  )
}

async function getTaskData() {
  const API_ENDPOINT='https://backend-8s2l.api.codehooks.io/dev/todoItems';
  const API_KEY = 'bc7dbf5b-09a7-4d58-bb83-ca430aaae411';

  try {
    const response = await fetch(API_ENDPOINT, {
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

export async function getStaticProps(context) {
  try {
    const taskID = context.params?.id;
    console.log(taskID);
    const data = await getTaskData();
    const foundTask = data.find((task) => taskID === task._id);
    console.log('id: ', taskID);
    console.log('props data: ', data);
    console.log('found task: ', foundTask);

    // This is the task that will actually get sent as props. I do this because
    // I don't want any author data sent.
    let task = {
      _id: foundTask._id,
      title: foundTask.title,
      description: foundTask.description,
      subject: foundTask.subject,
      subjectColor: foundTask.subjectColor,
      dueDate: foundTask.dueDate,
      isDone: foundTask.isDone
    }

    console.log('updated task: ', task);

    // if (!foundTask) {
    //   return 
    // }

    return {
      props: {
        desiredTask: task
      }
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

export async function getStaticPaths() {
  const data = await getTaskData();
  const paths = data.map(
    (task) => (
      {params: {
        id: task._id
      }}
    )
  );

  console.log('paths: ', paths);

  return {
    paths: paths,
    fallback: false
  };
}

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