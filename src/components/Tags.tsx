import '../styles/Tags.scss';
import Tag from './Tag';

import { useState, useEffect } from 'react';

import { User } from '../types';
import { fetchTags, fetchUserTags, assignUserTag, createTag } from '../api';
import { Tag as TagType, UserTags } from '../types';

type TagsProps = {
  user: User;
};

const Tags = ({ user }: TagsProps) => {
  const [allTags, setAllTags] = useState<TagType[]>([]);
  const [userTags, setUserTags] = useState<UserTags>(user.tags);
  const [userTagObjects, setUserTagObjects] = useState<TagType[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const showSuggestions = input.length > 0;

  // TODO: finish building out input here, then pull it out to it's own component
  // TODO: pull these out as helper functions

  const getAllTags = async () => {
    const result = await fetchTags();
    setAllTags(result);
  };

  useEffect(() => {
    getAllTags();
  }, [user]);

  useEffect(() => {
    const mapTags = async () => {
      setUserTagObjects(
        userTags.reduce((acc: TagType[], elem: string) => {
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

  // WORKING
  const selectTag = async (userID: string, tagID: string) => {
    try {
      setShowInput(false);
      setInput('');
      const updatedUser = await assignUserTag(userID, tagID);
      setUserTags(() => [...updatedUser.tags]);
    } catch (e) {
      console.error(e);
    }
  };

  // WORKING
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
    <div
      className='tags'
      tabIndex={1}
      // onBlur={() => setShowInput(false)}
      // TODO: make sure this doesn't affect dropdown select
      // onMouseLeave={() => setShowInput(false)}
    >
      <h3 className='tags--title'>Tags</h3>
      <div className='tags--items'>
        <ul className='tags--list' tabIndex={2}>
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
              />
              {showSuggestions && (
                <ul className='picker--options'>
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
                      >
                        {tag.title}
                      </li>
                    ))}
                  <li
                    className='picker'
                    onClick={() => createNewTag(input, user.uuid)}
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
                tabIndex={3}
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
