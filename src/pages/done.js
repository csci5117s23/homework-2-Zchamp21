const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import Header from '../components/Header.js';
import Navigation from '../components/Navigation.js';
import styles from '../styles/Todos.module.css';
import filterStyles from '../styles/Filters.module.css';
import React, { useEffect, useState } from 'react';
import TodoItems from '../components/TodoItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';
import DoneItems from '../components/DoneItems.js';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { RedirectToSignIn } from '@clerk/clerk-react';
// import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser } from '@clerk/clerk-react';

export default function Done() {
  const defaultSubject = {
    "title": "Default Subject",
    "color": "slategrey",
    "user": "default",
    "_id": "default"
  };

  const [topFormVisible, setTopFormVisible] = useState(false);
  const [bottomFormVisible, setBottomFormVisible] = useState(false);
  const [uploadedSubject, setUploadedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectDeleteTracker, setSubjectDeleteTracker] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  // const { isLoaded, isSignedIn, user } = useUser();
  // const [curUser, setCurUser] = useState(user);
  // console.log(curUser);

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
          const data = await response.json()

          let defaultSubjectsList = [defaultSubject];
          setSubjects(defaultSubjectsList.concat(data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchSubjects();
  }, [isLoaded]);

  // TODO: Update the username to be dependent on who is logged in.
  return (
    // <ClerkProvider>
    //   <SignedIn>
    <>
      <SignedIn>
        <Header 
          username=''
          page='done'
          showTopForm=''
        ></Header>
        <div className='pure-g'>
          <Navigation 
            curPage='done'
            uploadedSubject={uploadedSubject}
            setUploadedSubject={setUploadedSubject}
            subjects={subjects}
            setSubjects={setSubjects}
            loading={loading}
            subjectDeleteTracker={subjectDeleteTracker}
            setSubjectDeleteTracker={setSubjectDeleteTracker}
          ></Navigation>
          <DoneItems
            subjectDeleteTracker={subjectDeleteTracker}  
          ></DoneItems>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
    </>
    //   {/* </SignedIn>
    //   <SignedOut>
    //     <SignIn />
    //   </SignedOut>
    // </ClerkProvider> */}
  );
}