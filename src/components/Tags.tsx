import '../styles/Tags.scss';
import Tag from './Tag';

import { useState, useEffect, useRef } from 'react';

import { User } from '../types';
import { fetchTags, fetchUserTags, assignUserTag, createTag } from '../api';
import { Tag as TagType, UserTags } from '../types';
import { getAllTags, mapTags } from '../utils/helper';

type TagsProps = {
  user: User;
};

const Tags = ({ user }: TagsProps) => {
  const [allTags, setAllTags] = useState<TagType[]>([]);
  const [userTags, setUserTags] = useState<UserTags>(user.tags);
  const [userTagObjects, setUserTagObjects] = useState<TagType[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    nameRef.current?.focus();
  };

  const blur = () => {
    nameRef.current?.blur();
  };

  const showSuggestions = input.length > 0;

  useEffect(() => {
    getAllTags(setAllTags);
  }, [user, userTags]);

  useEffect(() => {
    mapTags(userTags, allTags, setUserTagObjects);
  }, [user, allTags, userTags]);

  const selectTag = async (userID: string, tagID: string) => {
    try {
      setShowInput(false);
      setInput('');
      const updatedUser = await assignUserTag(userID, tagID);
      setUserTags([...updatedUser.tags]);
    } catch (e) {
      console.error(e);
    }
  };

  const createNewTag = async (input: string, userID: string) => {
    try {
      const payload = { title: input };
      const result = await createTag(payload);
      await selectTag(userID, result.uuid);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='tags' tabIndex={0}>
      <h3 className='tags--title'>Tags</h3>
      <div className='tags--items'>
        <ul className='tags--list'>
          {userTagObjects.map((tag) => (
            <Tag
              key={tag.uuid}
              user={user}
              tag={tag}
              setUserTags={setUserTags}
            />
          ))}
          {showInput ? (
            <div>
              <input
                type='text'
                autoFocus
                className='picker--input'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={nameRef}
              />
              {showSuggestions && (
                <ul
                  className='picker--options'
                  onBlur={() => {
                    setInput('');
                    setShowInput(false);
                  }}
                >
                  {allTags
                    .filter(
                      (tag) =>
                        !userTags.includes(tag.uuid) &&
                        tag.title.toLowerCase().includes(input.toLowerCase())
                    )
                    .map((tag) => (
                      <li
                        className='picker--option'
                        onClick={(e) => {
                          e.stopPropagation(); // TOOD:check if this is actually necessary
                          selectTag(user.uuid, tag.uuid);
                        }}
                        key={tag.uuid}
                        tabIndex={0}
                      >
                        {tag.title}
                      </li>
                    ))}
                  <li
                    className='picker'
                    onClick={() => createNewTag(input, user.uuid)}
                    onKeyDown={(e) => {
                      e.key === 'Enter' && createNewTag(input, user.uuid);
                    }}
                    tabIndex={0}
                  >
                    <span className='picker--icon'></span>
                    <span className='picker--text'>CREATE TAG</span>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className='add'>
              <button
                className='add--icon'
                tabIndex={0}
                onClick={() => {
                  setShowInput(true);
                }}
              ></button>
              <span className='add--text'>ADD</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tags;
