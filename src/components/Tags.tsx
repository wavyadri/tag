import '../styles/Tags.scss';
import Tag from './Tag';
import TagInput from './TagInput';

import { useState, useEffect } from 'react';

import { User } from '../types';
import { UserTag, UserTags } from '../types';
import { getAllTags, mapTags } from '../utils/helper';
import { removeUserTag, assignUserTag, createTag } from '../api';

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

  const removeTag = async (tagID: string) => {
    try {
      const updatedUser = await removeUserTag(user.uuid, tagID);
      setUserTags([...updatedUser.tags]);
    } catch (e) {
      console.error(e);
    }
  };

  const selectTag = async (tagID: string) => {
    try {
      setShowInput(false);
      // setInput('');
      const updatedUser = await assignUserTag(user.uuid, tagID);
      setUserTags([...updatedUser.tags]);
    } catch (e) {
      console.error(e);
    }
  };

  const createNewTag = async (input: string) => {
    try {
      const payload = { title: input };
      const result = await createTag(payload);
      await selectTag(result.uuid);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='tags'>
      <ul className='tags__list'>
        {userTagObjects.map((tag) => (
          <Tag key={tag.uuid} tag={tag} removeTag={removeTag} />
        ))}
        {showInput ? (
          <TagInput
            allTags={allTags}
            userTags={userTags}
            closeInput={() => setShowInput(false)}
            selectTag={selectTag}
            createTag={createNewTag}
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
