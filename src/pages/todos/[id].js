const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SignedIn, useAuth, useUser } from '@clerk/nextjs';
import Header from '@/components/Header.js';
import IndividualTask from '@/components/TaskComponents/IndividualTask.js';

export default function Task() {
  const [curTask, setCurTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [curTaskDone, setCurTaskDone] = useState(false);
  const router = useRouter();
  let { id } = router.query;

  const { isSignedIn, user } = useUser();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user])

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
          if (!response.ok) {
            router.push('/404');
            return;
          }
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
      <SignedIn>
        <Header
          message='Here is Your Requested Task'
          page='individualTask'
          showTopForm=''
        ></Header>
        {isLoading ? (
          <h1>LOADING...</h1>
        ) : (
          <IndividualTask task={curTask} setComplete={updateIsDone}></IndividualTask>
        )}
      </SignedIn>
    </>
  );
}