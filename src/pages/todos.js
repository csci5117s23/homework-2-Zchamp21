import Header from '../components/Header.js';
import Navigation from '../components/Navigation.js';
import styles from '../styles/Todos.module.css';
import filterStyles from '../styles/Filters.module.css';
import React, { useState } from 'react';
import TodoItems from '../components/TodoItems.js';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/grids-responsive-min.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import { RedirectToSignIn } from '@clerk/clerk-react';
// You should do that in a Layout file or in `gatsby-browser.js`.
config.autoAddCss = false;
import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser } from '@clerk/nextjs';

export default function Todos() {
  const [topFormVisible, setTopFormVisible] = useState(false);
  const [bottomFormVisible, setBottomFormVisible] = useState(false);
  // const { isLoaded, isSignedIn, user } = useUser();
  // const [curUser, setCurUser] = useState(user);
  // console.log(curUser);

  function toggleTopForm() {
    setTopFormVisible(!topFormVisible);
  }

  function toggleBottomForm() {
    setBottomFormVisible(!bottomFormVisible);
  }

  // TODO: Update the username to be dependent on who is logged in.
  return (
    <>
      {/* <ClerkProvider>
        <SignedIn> */}
      <SignedIn>
          <Header 
            username='Zach'
            page='todos'
            showTopForm={toggleTopForm}
          ></Header>
          <div className='pure-g'>
            <Navigation curPage='todos'></Navigation>
            <TodoItems 
              topFormVisible={topFormVisible} 
              bottomFormVisible={bottomFormVisible} 
              toggleTopForm={toggleTopForm}
              toggleBottomForm={toggleBottomForm}>
            </TodoItems>
          </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
        {/* </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </ClerkProvider> */}
    </>
  );
}