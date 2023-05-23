import './styles.scss';

import { UserTag } from '../../../../types';

type TagProps = {
  tag: UserTag;
  removeTag: (tagID: string) => Promise<void>;
};

const Tag = ({ tag, removeTag }: TagProps) => {
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
        onClick={() => removeTag(tag.uuid)}
      />
    </li>
  );
};

export default Tag;
