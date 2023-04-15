import Subject from "./Subject";

export default function SubjectList({ curPage, subjects, loading, deleteSubject, curSubjId }) {
  if (loading) {
    return <h2>LOADING SUBJECTS...</h2>
  } else {
    let subjectList = subjects.map(
      (subject) =>
        <Subject
          key={subject._id}
          subjId={subject._id}
          name={subject.title}
          color={subject.color}
          page={curPage}
          deleteSubject={deleteSubject}
          curSubjId={curSubjId}
        ></Subject>
    )

    return (
      <div>{subjectList}</div>
    )
  }
}