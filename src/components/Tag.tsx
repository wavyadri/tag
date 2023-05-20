import '../styles/Tag.scss';

import { User, Tag, UserTags } from '../types';
import { removeUserTag } from '../api';

type TagItemProps = {
  user: User;
  tag: Tag;
  setUserTags: React.Dispatch<React.SetStateAction<UserTags>>;
};

const TagItem = ({ user, tag, setUserTags }: TagItemProps) => {
  const removeTag = async (userID: string, tagID: string) => {
    try {
      const updatedUser = await removeUserTag(userID, tagID);
      setUserTags([...updatedUser.tags]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li
      className='tag'
      style={{
        backgroundColor: `${tag.color.primary}`,
        color: `${tag.color.secondary}`,
        borderColor: `${tag.color.secondary}`,
      }}
      tabIndex={0}
    >
      <p>{tag.title}</p>
      <button
        className='tag-remove'
        style={{
          color: `${tag.color.secondary}`,
        }}
        onClick={() => removeTag(user.uuid, tag.uuid)}
      >
        &#x2715;
      </button>
    </li>
  );
};

export default TagItem;
