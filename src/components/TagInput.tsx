import { useState, useRef, MutableRefObject } from 'react';
import { UserTag, UserTags } from '../types';

type TagInputProps = {
  allTags: UserTag[];
  userTags: UserTags;
  selectTag: (tagID: string) => Promise<void>;
  createTag: (input: string) => Promise<void>;
  closeInput: () => void;
};

const TagInput = ({
  allTags,
  userTags,
  selectTag,
  createTag,
  closeInput,
}: TagInputProps) => {
  const [input, setInput] = useState<string>('');
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const showSuggestions = input.length > 0;

  return (
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
            closeInput();
          }
        }}
        onBlur={() => {
          if (!showSuggestions) {
            closeInput();
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
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    selectTag(tag.uuid);
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
            onClick={() => createTag(input)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createTag(input);
              }
            }}
            tabIndex={0}
            onBlur={() => {
              setInput('');
              closeInput();
            }}
            role='button'
          >
            <span className='picker__icon'></span>
            <span className='picker__text'>CREATE TAG</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TagInput;
