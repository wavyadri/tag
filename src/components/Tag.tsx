import '../styles/Tag.scss';

import { User, UserTag } from '../types';

type TagProps = {
  user: User;
  tag: UserTag;
  removeTag: (userID: string, tagID: string) => Promise<void>;
};

const Tag = ({ user, tag, removeTag }: TagProps) => {
  return (
    <li
      tabIndex={0}
      className='tag'
      style={{
        backgroundColor: `${tag.color.primary}`,
        color: `${tag.color.secondary}`,
        borderColor: `${tag.color.secondary}`,
      }}
    >
      <p>{tag.title}</p>
      <button
        className='tag-remove'
        style={{
          color: `${tag.color.secondary}`,
        }}
        onClick={() => removeTag(user.uuid, tag.uuid)}
      />
    </li>
  );
};

export default Tag;
