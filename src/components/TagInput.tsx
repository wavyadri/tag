import { Dispatch, SetStateAction, useState } from 'react';
import { Tag } from '../types';
import { assignUserTag, createTag, fetchUserTags } from '../api';

type TagInputProps = {
  allTags: Tag[];
  userID: string;
  setShowInput: Dispatch<SetStateAction<boolean>>;
};

const TagInput = ({ allTags, userID, setShowInput }: TagInputProps) => {
  const [input, setInput] = useState<string>('');
  const [selectedInput, setSelectedInput] = useState<Tag>();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const createNewTag = () => {
    console.log('create new taggzz');
  };

  const assignT = async (tagID: string) => {
    await assignUserTag(userID, tagID).then(console.log);
    setShowInput(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='text'
        autoFocus
        className='tag--input'
      />
      {showSuggestions && (
        <ul>
          {allTags.map((tag) => (
            <li onClick={() => assignT(tag.uuid)} key={tag.uuid}>
              {tag.title}
            </li>
          ))}
          <li>
            <button onClick={createNewTag}>Create New Tag</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TagInput;
