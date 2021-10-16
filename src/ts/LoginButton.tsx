import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type LoginButtonProps = {
  landing?: boolean;
  setLoggingIn?: Function;
};

const LoginButton: FC<LoginButtonProps> = ({
  landing = false,
  setLoggingIn,
}) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <button
        className={'logoutButton clickable logButton'}
        onClick={() => {
          setLoggingIn(false);
          logout({ returnTo: window.location.origin });
        }}
      >
        Log Out
      </button>
    );
  }
  return (
    <button
      className={'loginButton clickable logButton'}
      id={landing ? 'landingLog' : null}
      onClick={() => {
        setLoggingIn(true);
        loginWithRedirect();
      }}
    >
      Log in / Sign up
    </button>
  );
};

export default LoginButton;
