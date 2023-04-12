const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Subject from "./Subject";
import { useRouter } from "next/router";


export default function SubjectList({ uploadedSubject, curPage, subjects, loading }) {
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
          isActive={false}
        ></Subject>
    )

    return (
      <div>{subjectList}</div>
    )
  }
}