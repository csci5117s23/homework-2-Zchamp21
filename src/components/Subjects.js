const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import SubjectForm from "./SubjectForm";
import SubjectHead from "./SubjectHead";
import { useEffect, useState } from "react";
import SubjectList from "./SubjectList";

export default function Subjects({ uploadedSubject, setUploadedSubject, curPage, subjects, setSubjects, loading }) {
  const [addSubjectFormVisible, setAddSubjectFormVisible] = useState(false);
  const [nextSubject, setNextSubject] = useState(null);
  // const [uploadedSubject, setUploadedSubject] = useState(null);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const addNewSubject = async () => {
      if (nextSubject) {
        if (userId) {
          try {
            const token = await getToken({ template: "codehooks" });

            const response = await fetch (backend_base + '/subjects', {
              'method': 'POST',
              'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify(nextSubject)
            });

            const result = await response.json();
            setSubjects(subjects.concat(result));
            console.log('Success: ', result);
            setNextSubject(null);
            // setUploadedSubject(result);
          } catch (error) {
            console.error('Error: ', error);
          }
        }
      }
    }
    addNewSubject();
  }, [isLoaded, nextSubject]);

  function addSubject(newSubject) {
    setNextSubject(newSubject);
  }

  function toggleSubjectForm() {
    setAddSubjectFormVisible(!addSubjectFormVisible);
  }

  return (
    <>
      <SubjectHead
        toggleForm={toggleSubjectForm}
      ></SubjectHead>
      <SubjectForm
        isVisible={addSubjectFormVisible}
        toggleForm={toggleSubjectForm}
        addSubject={addSubject}
      ></SubjectForm>
      <SubjectList
        uploadedSubject={uploadedSubject}
        curPage={curPage}
        subjects={subjects}
        loading={loading}
      ></SubjectList>
    </>
  )
}