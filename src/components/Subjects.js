const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import SubjectForm from "./SubjectForm";
import SubjectHead from "./SubjectHead";
import { useEffect, useState } from "react";
import SubjectList from "./SubjectList";

export default function Subjects({ uploadedSubject, setUploadedSubject, curPage, subjects, setSubjects, loading, subjectDeleteTracker, setSubjectDeleteTracker }) {
  const [addSubjectFormVisible, setAddSubjectFormVisible] = useState(false);
  const [nextSubject, setNextSubject] = useState(null);
  // const [uploadedSubject, setUploadedSubject] = useState(null);

  console.log('subject del tracker in subjects: ', subjectDeleteTracker);

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

  function findSubject(subjId) {
    for (let subject of subjects) {
      if (subject._id === subjId) {
        return subject;
      }
    }
  }

  async function deleteFromSubjects(subjId) {
    if (userId) {
      try {
        const token = await getToken({ template: "codehooks" });

        let response = await fetch(backend_base + `/subjects/${subjId}`, {
          'method': 'DELETE',
          'headers': {
            'Authorization': 'Bearer ' + token
          }
        });
        if (response.ok) {
          setSubjects((cur) => 
            cur.filter((subj) => subj._id != subjId)
          )
          console.log('subjects after removal: ', subjects);
        }
        return await response.json();
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  }

  async function modifyTasks(subjId) {
    if (userId) {
      try {
        const token = await getToken({ template: "codehooks" });

        let response = await fetch(backend_base + `/updateTodos`, {
          'method': 'PATCH',
          'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            subject: "Default Subject",
            subjectColor: "slategrey",
            subjectId: "default",
            origSubjId: subjId
          })
        });
        const result = await response.json();
        console.log('Success: ', result);
        return result;
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  }

  async function deleteSubject(subjId) {
    let deleteResp = await deleteFromSubjects(subjId);
    console.log('delete respose: ', deleteResp);
    let modifyResp = await modifyTasks(subjId);
    setSubjectDeleteTracker(deleteResp._id);
    console.log('subject delete tracker: ', subjectDeleteTracker);
    console.log('modify response: ', modifyResp);
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
        deleteSubject={deleteSubject}
      ></SubjectList>
    </>
  )
}