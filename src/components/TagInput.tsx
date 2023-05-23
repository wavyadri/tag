import { useState, useRef, MutableRefObject } from 'react';
import { UserTag, UserTags } from '../types';

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
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
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
            ref={inputRef}
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
                    key={tag.uuid}
                    tabIndex={0}
                  >
                    {tag.title}
                  </li>
                ))}
              <li
                className='picker'
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
                tabIndex={0}
                onBlur={() => {
                  clearInput();
                }}
                role='button'
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
