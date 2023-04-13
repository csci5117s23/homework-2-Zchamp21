const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import Header from '@/components/Header.js';
import Navigation from '@/components/Navigation.js';
import styles from '@/styles/Todos.module.css';
import filterStyles from '@/styles/Filters.module.css';
import React, { useState, useEffect } from 'react';
import TodoItems from '@/components/TodoItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import { RedirectToSignIn } from '@clerk/clerk-react';
// You should do that in a Layout file or in `gatsby-browser.js`.
config.autoAddCss = false;
import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser, useAuth } from '@clerk/nextjs';
import Home from '..';
import { useRouter } from 'next/router';

export default function Todos() {
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
  const [subjectDeleteTracker, setSubjectDeleteTracker] = useState('');
  console.log('subject del tracker in todos: ', subjectDeleteTracker);

  const { isSignedIn, user } = useUser();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();

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

  // TODO: Get rid of the username in the Header component.
  return (
    <>
      {/* <ClerkProvider>
        <SignedIn> */}
      <SignedIn>
        <Header 
          username=''
          page='todos'
          showTopForm={toggleTopForm}
        ></Header>
        <div className='pure-g'>
          <Navigation 
            curPage='todos' 
            uploadedSubject={uploadedSubject}
            setUploadedSubject={setUploadedSubject}
            subjects={subjects}
            setSubjects={setSubjects}
            loading={loading}
            subjectDeleteTracker={subjectDeleteTracker}
            setSubjectDeleteTracker={setSubjectDeleteTracker}
          ></Navigation>
          <TodoItems 
            topFormVisible={topFormVisible} 
            bottomFormVisible={bottomFormVisible} 
            toggleTopForm={toggleTopForm}
            toggleBottomForm={toggleBottomForm}
            uploadedSubject={uploadedSubject}
            subjects={subjects}
            setSubjects={setSubjects}
            loading={loading}
            subjectDeleteTracker={subjectDeleteTracker}
          ></TodoItems>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
        {/* </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </ClerkProvider> */}
    </>
  );
}