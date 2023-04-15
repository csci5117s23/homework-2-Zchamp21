const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useState, useEffect } from 'react';
import { SignedIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Header from "@/components/Header.js";
import Navigation from "@/components/NavigationComponents/Navigation.js";
import SubjectDoneItems from "@/components/SubjectComponents/SubjectDoneItems.js";
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';

export default function IndividualSubject() {
  const router = useRouter();
  let { subjId } = router.query;

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
  const [curSubject, setCurSubject] = useState('');
  const [individualLoading, setIndividualLoading] = useState(true);

  const { isSignedIn, user } = useUser();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (!user) {
      console.log('user: ', user);
      router.push('/');
    }
  }, [user])

  // Before doing anything else, first check that the desired subject exists and the current user has access to it.
  useEffect(() => {
    const getIndividualSubject = async () => {
      // If the subjId is the id for the default subject, don't query the database.
      if (subjId != "default") {
        try {
          if (userId) {
            const token = await getToken({ template: "codehooks" });

            const response = await fetch(backend_base + `/subjects/${subjId}`, {
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
            setCurSubject(data);
            setIndividualLoading(false);
            console.log('Success: ', data);
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      } else {
        setCurSubject(defaultSubject);
        setIndividualLoading(false);
      }
    }
    getIndividualSubject();
  }, [isLoaded, router]);

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

  if (individualLoading) {
    return <div>LOADING SUBJECT...</div>
  } else {
    return (
      <>
        <SignedIn>
          <Header 
            message={`Here are your ${curSubject.title}'s Complete Tasks`}
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
              curSubjId={subjId}
            ></Navigation>
            <SubjectDoneItems
              id={subjId}
              subjectDeleteTracker={subjectDeleteTracker}
            ></SubjectDoneItems>
          </div>
        </SignedIn>
      </>
    )
  }
}