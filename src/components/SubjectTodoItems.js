const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Form from './Form';
import SubjectTodosWrapper from './SubjectTodosWrapper';

export default function SubjectTodoItems({ id, topFormVisible, bottomFormVisible, toggleTopForm, toggleBottomForm, uploadedSubject, subjects, setSubjects, loading, subjectDeleteTracker, router }) {
  const [nextTask, setNextTask] = useState(null);
  const [uploadedTask, setUploadedTask] = useState(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const addNewTask = async () => {
      if (nextTask) {
        if (userId) {
          try {
          
            const token = await getToken({ template: "codehooks" });
            console.log('token: ', token);

            const response = await fetch(backend_base + '/todoItems', {
              'method': 'POST',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify(nextTask)
            });

            const result = await response.json();
            console.log('Success: ', result);
            // Update the state so that we can update the page in real time
            // without performing another get request.
            setUploadedTask(result);
          } catch (error) {
          console.error('Error: ', error);
          } 
        }
      }
    }
    addNewTask();
  }, [isLoaded, nextTask]);

  function addTask(newTask) {
    setNextTask(newTask);
  }

  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <Form 
        isVisible={topFormVisible} 
        cancelForm={toggleTopForm} 
        addTask={addTask} 
        uploadedSubject={uploadedSubject}
        subjects={subjects}
        setSubjects={setSubjects}
        loading={loading}
        curSubjId={id}
      ></Form>

      <SubjectTodosWrapper subjId={id} uploadedTask={uploadedTask} subjectDeleteTracker={subjectDeleteTracker} router={router}></SubjectTodosWrapper>
    </div>
  )
}