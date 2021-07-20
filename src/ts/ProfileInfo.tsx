import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileInfo: FC = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} className={'profilePicture'} />
        <h2 className={'profileUsername'}>{user.name}</h2>
      </div>
    )
  );
};

export default ProfileInfo;
