import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import DemoUser from './DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='logged-out-nav'>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <DemoUser />
      </div>
    );
  }

  return (
      <div className='navbar'>
        <NavLink className='home-link' exact to="/home">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
  );
}

export default Navigation;
