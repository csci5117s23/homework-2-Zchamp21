const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { SignedIn, useUser, useAuth } from '@clerk/nextjs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header.js';
import Navigation from '@/components/NavigationComponents/Navigation.js';
import TodoItems from '@/components/TodoComponents/TodoItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';

export default function Todos() {
  const [topFormVisible, setTopFormVisible] = useState(false);
  const [bottomFormVisible, setBottomFormVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectDeleteTracker, setSubjectDeleteTracker] = useState('');

  const { isSignedIn, user } = useUser();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();

  // Redirect to '/' if the user is not logged in.
  useEffect(() => {
    if (!user) {
      console.log('user: ', user);
      router.push('/');
    }
  }, [user])

  // A default subject so that when a user deletes a subject, the tasks of that subject have somewhere to go.
  const defaultSubject = {
    "title": "Default Subject",
    "color": "slategrey",
    "user": "default",
    "_id": "default"
  };

  function toggleTopForm() {
    setTopFormVisible(!topFormVisible);
  }

  function toggleBottomForm() {
    setBottomFormVisible(!bottomFormVisible);
  }

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (userId) {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + '/subjects', {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });
          const data = await response.json();

          let defaultSubjectsList = [defaultSubject]
          setSubjects(defaultSubjectsList.concat(data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchSubjects();
  }, [isLoaded]);

  return (
    <>
      <SignedIn>
        <Head>
          <title>Your Todos</title>
          <link rel='icon' href='/favicon.ico' />
      </Head>
        <Header 
          message='Here are your Incomplete Tasks'
          page='todos'
          showTopForm={toggleTopForm}
        ></Header>
        <div className='pure-g'>
          <Navigation 
            curPage='todos' 
            subjects={subjects}
            setSubjects={setSubjects}
            loading={loading}
            setSubjectDeleteTracker={setSubjectDeleteTracker}
          ></Navigation>
          <TodoItems 
            topFormVisible={topFormVisible} 
            bottomFormVisible={bottomFormVisible} 
            toggleTopForm={toggleTopForm}
            toggleBottomForm={toggleBottomForm}
            subjects={subjects}
            loading={loading}
            subjectDeleteTracker={subjectDeleteTracker}
          ></TodoItems>
        </div>
      </SignedIn>
    </>
  );
}