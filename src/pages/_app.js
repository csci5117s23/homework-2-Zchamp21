import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
// https://markoskon.com/fix-oversized-icons-from-react-fontawesome/
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import '../styles/globals.css';
import 'purecss';

// https://github.com/vercel/next.js/issues/9992#issuecomment-784133959
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ClerkProvider>
      <Component {...pageProps} key={router.asPath} />
    </ClerkProvider>
  );
}