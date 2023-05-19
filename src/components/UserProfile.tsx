import Tags from './Tags';

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

  return <Tags user={user} />;
};

export default UserProfile;
