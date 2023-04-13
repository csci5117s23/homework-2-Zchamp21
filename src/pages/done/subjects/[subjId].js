const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { RedirectToSignIn } from '@clerk/clerk-react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import SubjectDoneItems from "@/components/SubjectDoneItems";

export default function IndividualSubject() {
  const router = useRouter();
  let { subjId } = router.query;

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
        <Header 
          username=''
          page='done'
          showTopForm={toggleTopForm}
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
          <SubjectDoneItems
            id={subjId}
            subjectDeleteTracker={subjectDeleteTracker}
          ></SubjectDoneItems>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
    </>
  )
}