import React, { FC, useState, useEffect } from 'react';
import '../sass/styles.scss';

import LoginButton from './LoginButton';
import ProfileInfo from './ProfileInfo';

const Login: FC = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div id='loginButton'>
        <LoginButton />
      </div>
      <div id='userProfileInfo'>
        <ProfileInfo />
      </div>
    </div>
  );
};

export default Login;
