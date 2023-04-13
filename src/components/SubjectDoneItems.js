const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Form from './Form';
import SubjectDoneWrapper from './SubjectDoneWrapper';

export default function SubjectDoneItems({ id, subjectDeleteTracker }) {
  return (
    <div className='pure-u-1 pure-u-lg-4-5'>
      <SubjectDoneWrapper subjId={id} subjectDeleteTracker={subjectDeleteTracker}></SubjectDoneWrapper>
    </div>
  )
}