import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import DemoUser from './DemoUser';
import SplashPage from '../SplashPage/Splashpage';
import SignupFormModal from '../SignupFormPage/SignupModal';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='logged-in-nav nav'>
        <h1 className='beavernote'>Beavernote</h1>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <div className='logged-out-nav nav'>
          <LoginFormModal />
          <SignupFormModal />
          <DemoUser />
        </div>
        <div className='splash-page'>
          <SplashPage />
        </div>
      </div>
    );
  }

  return (
    <div>

    </div>
  );
}

export default Navigation;
