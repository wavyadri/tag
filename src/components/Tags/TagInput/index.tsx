import './styles.scss';

import { useState } from 'react';
import { UserTag, UserTags } from '../../../types';

type TagInputProps = {
  allTags: UserTag[];
  userTags: UserTags;
  selectTag: (tagID: string) => Promise<void>;
  createTag: (input: string) => Promise<void>;
};

const TagInput = ({
  allTags,
  userTags,
  selectTag,
  createTag,
}: TagInputProps) => {
  const [input, setInput] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const showSuggestions = input.length > 0;

  const clearInput = () => {
    setShowInput(false);
    setInput('');
  };

  return (
    <>
      {showInput ? (
        <div>
          <input
            className='picker__input'
            type='text'
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (!showSuggestions && e.key === 'Tab') {
                clearInput();
              }
            }}
            onBlur={() => {
              if (!showSuggestions) {
                clearInput();
              }
            }}
          />
          {showSuggestions && (
            <ul className='picker__options'>
              {allTags
                .filter(
                  (tag) =>
                    !userTags.includes(tag.uuid) &&
                    tag.title.toLowerCase().includes(input.toLowerCase())
                )
                .map((tag) => (
                  <li
                    key={tag.uuid}
                    tabIndex={0}
                    className='picker__option'
                    onClick={() => {
                      selectTag(tag.uuid);
                      clearInput();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        selectTag(tag.uuid);
                        clearInput();
                      }
                    }}
                  >
                    {tag.title}
                  </li>
                ))}
              <li
                tabIndex={0}
                className='picker'
                role='button'
                onClick={() => {
                  createTag(input);
                  clearInput();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createTag(input);
                    clearInput();
                  }
                }}
                onBlur={() => {
                  clearInput();
                }}
              >
                <span className='picker__icon'></span>
                <span className='picker__text'>CREATE TAG</span>
              </li>
            </ul>
          )}
        </div>
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
    </>
  );
};

export default TagInput;
