import '../styles/Tags.scss';
import Tag from './Tag';
import TagInput from './TagInput';

import { useState, useEffect } from 'react';

import { User } from '../types';
import { UserTag, UserTags } from '../types';
import { getAllTags, mapTags } from '../utils/helper';
import { removeUserTag } from '../api';

type TagsProps = {
  user: User;
};

const Tags = ({ user }: TagsProps) => {
  const [allTags, setAllTags] = useState<UserTag[]>([]);
  const [userTags, setUserTags] = useState<UserTags>(user.tags);
  const [userTagObjects, setUserTagObjects] = useState<UserTag[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);

  useEffect(() => {
    getAllTags(setAllTags);
  }, [user, userTags]);

  useEffect(() => {
    mapTags(userTags, allTags, setUserTagObjects);
  }, [user, allTags, userTags]);

  const removeTag = async (userID: string, tagID: string) => {
    try {
      const updatedUser = await removeUserTag(userID, tagID);
      setUserTags([...updatedUser.tags]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='tags'>
      <ul className='tags__list'>
        {userTagObjects.map((tag) => (
          <Tag key={tag.uuid} user={user} tag={tag} removeTag={removeTag} />
        ))}
        {showInput ? (
          <TagInput
            user={user}
            allTags={allTags}
            userTags={userTags}
            setShowInput={setShowInput}
            setUserTags={setUserTags}
          />
        ) : (
          <div className='add'>
            <button
              tabIndex={0}
              className='add__icon'
              onClick={() => {
                setShowInput(true);
              }}
            />
            <span className='add__text'>ADD</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Tags;
