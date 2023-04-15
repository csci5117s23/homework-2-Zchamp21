const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useEffect, useState } from 'react';
import { SignedIn, useAuth, useUser } from '@clerk/nextjs';
import Header from '@/components/Header.js';
import Navigation from '@/components/NavigationComponents/Navigation.js';
import DoneItems from '@/components/TodoComponents/DoneItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';

import { useRouter } from 'next/router';

export default function Done() {
  const defaultSubject = {
    "title": "Default Subject",
    "color": "slategrey",
    "user": "default",
    "_id": "default"
  };

  const [uploadedSubject, setUploadedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectDeleteTracker, setSubjectDeleteTracker] = useState(true);

  const { isSignedIn, user } = useUser();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log('user: ', user);
      router.push('/');
    }
  }, [user])

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

  return (
    <>
      <SignedIn>
        <Header 
          message='Here are Your Completed Tasks'
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
            setSubjectDeleteTracker={setSubjectDeleteTracker}
          ></Navigation>
          <DoneItems
            subjectDeleteTracker={subjectDeleteTracker}  
          ></DoneItems>
        </div>
      </SignedIn>
    </>
  );
}