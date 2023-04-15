import DoneWrapper from './DoneWrapper.js';

export default function DoneItems({ subjectDeleteTracker }) {
  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <DoneWrapper subjectDeleteTracker={subjectDeleteTracker}></DoneWrapper>
    </div>
  );
}

