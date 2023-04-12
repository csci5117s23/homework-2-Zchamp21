import { useRouter } from "next/router";

export default function IndividualSubject() {
  const router = useRouter();
  let { subjId } = router.query;

  return (
    <h1>Subject: {subjId}</h1>
  )
}