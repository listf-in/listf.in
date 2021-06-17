import React, {FC} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  // If we're already logged in display logout button instead:
  if (isAuthenticated) {
    return <button onClick={() => logout({ returnTo: window.location.origin })}></button>
  }
  return <button onClick={() => loginWithRedirect()}>Log in</button>;
}

export default LoginButton;