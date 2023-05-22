import '../styles/UserProfile.scss';
import Tags from './Tags';
import UserProfileSection from './UserProfileSection';

import { useState, useEffect } from 'react';

import { fetchUser } from '../api';
import { User } from '../types';

type UserProfileProps = {
  uuid: string;
};

const UserProfile = ({ uuid }: UserProfileProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser(uuid);
      setUser(user);
    };
    getUser();
  }, [uuid]);

  if (!user) return null;

  return (
    <div className='profile'>
      <UserProfileSection title='tags'>
        <Tags user={user} />
      </UserProfileSection>
    </div>
  );
};

export default UserProfile;
