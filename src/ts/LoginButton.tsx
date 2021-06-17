import React, {FC} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: FC = () => {
  const { loginWithRedirect } = useAuth0()

  return <button onClick={() => loginWithRedirect()}>Log in</button>;
}

export default LoginButton;