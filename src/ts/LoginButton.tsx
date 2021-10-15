import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type LoginButtonProps = {
  landing?: boolean;
};

const LoginButton: FC<LoginButtonProps> = ({ landing = false }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <button
        className={'logoutButton clickable logButton'}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    );
  }
  return (
    <button
      className={'loginButton clickable logButton'}
      id={landing ? 'landingLog' : null}
      onClick={() => loginWithRedirect()}
    >
      Log in
    </button>
  );
};

export default LoginButton;
