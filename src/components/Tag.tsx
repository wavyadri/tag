import '../styles/Tag.scss';
import { User, Tag } from '../types';

type TagItemProps = {
  user: User;
  tag: Tag;
};

const TagItem = ({ user, tag }: TagItemProps) => {
  return (
    <li
      className='tag'
      style={{
        backgroundColor: `${tag.color.primary}`,
        color: `${tag.color.secondary}`,
        borderColor: `${tag.color.secondary}`,
      }}
    >
      {tag.title}
    </li>
  );
};

export default TagItem;
