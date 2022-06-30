import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import DemoUser from './DemoUser';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='logged-in-nav nav'>
        <NavLink className='home-link' exact to="/home">Home</NavLink>
        <h1 className='beavernote'>Beavernote</h1>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='logged-out-nav nav'>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <DemoUser />
      </div>
    );
  }

  return (
    <div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
