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
    >
      <p>{tag.title}</p>
      <span
        className='tag-remove'
        onClick={() => removeTag(user.uuid, tag.uuid)}
      >
        &#x2715;
      </span>
    </li>
  );
};

export default TagItem;
