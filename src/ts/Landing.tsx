import React, { FC } from 'react';
import '../sass/styles.scss';
import LoginButton from './LoginButton';

const Landing: FC = () => {
  return (
    <div id='landing'>
      <h1 className='landingLogo'>LISTF.IN</h1>
      <h3 className='landingSubtitle'>
        Infinite Lists,
        <br />
        Infinite Possibilities
      </h3>
      <LoginButton landing={true} />
    </div>
  );
};

export default Landing;
