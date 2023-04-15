import SubjectDoneWrapper from './SubjectDoneWrapper';

export default function SubjectDoneItems({ id, subjectDeleteTracker }) {
  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <SubjectDoneWrapper subjId={id} subjectDeleteTracker={subjectDeleteTracker}></SubjectDoneWrapper>
    </div>
  )
}