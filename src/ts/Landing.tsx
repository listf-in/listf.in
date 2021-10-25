import React, { FC } from 'react';
import '../sass/styles.scss';
import LoginButton from './LoginButton';

const Landing: FC = () => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  return loggingIn ? null : (
    <div id='landing'>
      <img src='listfinBlack.png' className='landingLogo logo'></img>
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
