import {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  MutableRefObject,
} from 'react';
import { UserTag, User, UserTags } from '../types';
import { assignUserTag, createTag } from '../api';

type TagInputProps = {
  allTags: UserTag[];
  user: User;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  setUserTags: Dispatch<SetStateAction<UserTags>>;
  userTags: UserTags;
};

const TagInput = ({
  setUserTags,
  setShowInput,
  user,
  allTags,
  userTags,
}: TagInputProps) => {
  const [input, setInput] = useState<string>('');
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const showSuggestions = input.length > 0;

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
            setShowInput(false);
          }
        }}
        onBlur={() => {
          if (!showSuggestions) {
            setShowInput(false);
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
                onClick={(e) => {
                  selectTag(user.uuid, tag.uuid);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    selectTag(user.uuid, tag.uuid);
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
            onClick={() => createNewTag(input, user.uuid)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createNewTag(input, user.uuid);
              }
            }}
            tabIndex={0}
            onBlur={() => {
              setInput('');
              setShowInput(false);
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
