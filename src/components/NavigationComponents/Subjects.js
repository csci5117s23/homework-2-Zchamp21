const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SubjectHead from "./SubjectHead";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";

export default function Subjects({ curPage, subjects, setSubjects, loading, setSubjectDeleteTracker, curSubjId }) {
  const [addSubjectFormVisible, setAddSubjectFormVisible] = useState(false);
  const [nextSubject, setNextSubject] = useState(null);

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

  // Call the above two functions to delete a subject then modify all tasks with that subject.
  async function deleteSubject(subjId) {
    let deleteResp = await deleteFromSubjects(subjId);
    let modifyResp = await modifyTasks(subjId);
    setSubjectDeleteTracker(deleteResp._id);
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
        curPage={curPage}
        subjects={subjects}
        loading={loading}
        deleteSubject={deleteSubject}
        curSubjId={curSubjId}
      ></SubjectList>
    </>
  )
}