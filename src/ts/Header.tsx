import React, { FC } from 'react';
import '../sass/styles.scss';

import LoginButton from './LoginButton';
// import ProfileInfo from './ProfileInfo';

const Header: FC = () => {
  return (
    <div id='header'>
      <h1 className='logo'>LISTF.IN</h1>
      {/* <ProfileInfo /> */}
      <div id='loginButton'>
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
