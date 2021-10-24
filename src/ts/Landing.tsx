import React, { FC } from 'react';
import '../sass/styles.scss';
import LoginButton from './LoginButton';

const Landing: FC = () => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  return loggingIn ? null : (
    <div id='landing'>
      <h1 className='landingLogo logo'>LISTF.IN</h1>
      <LoginButton setLoggingIn={setLoggingIn} landing={true} />
      <h3 className='landingSubtitle'>
        Infinite Lists,
        <br />
        Infinite Possibilities
      </h3>
    </div>
  );
};

export default Landing;
