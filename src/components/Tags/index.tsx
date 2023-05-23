import './styles.scss';
import Tag from './Tag';
import TagInput from './TagInput';

import { useState, useEffect } from 'react';

import { User } from '../../types';
import { UserTag, UserTags } from '../../types';
import { removeUserTag, assignUserTag, createTag, fetchTags } from '../../api';

type TagsProps = {
  user: User;
};

const Tags = ({ user }: TagsProps) => {
  const [allTags, setAllTags] = useState<UserTag[]>([]);
  const [userTags, setUserTags] = useState<UserTags>(user.tags);
  const [userTagObjects, setUserTagObjects] = useState<UserTag[]>([]);

  useEffect(() => {
    const getAllTags = async () => {
      try {
        const result = await fetchTags();
        setAllTags([...result]);
      } catch (e) {
        console.error(e);
      }
    };
    getAllTags();
  }, [user, userTags]);

  useEffect(() => {
    const mapTags = async () => {
      setUserTagObjects(
        userTags.reduce((acc: UserTag[], elem: string) => {
          let match = allTags.find((tag) => tag.uuid === elem);
          if (match) {
            acc.push(match);
          }
          return acc;
        }, [])
      );
    };
    mapTags();
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
        <TagInput
          allTags={allTags}
          userTags={userTags}
          selectTag={selectTag}
          createTag={createNewTag}
        />
      </ul>
    </div>
  );
};

export default Tags;
