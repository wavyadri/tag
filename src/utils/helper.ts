import { Tag, UserTags } from '../types';
import { fetchTags } from '../api';

export const getAllTags = async (
  setAllTags: (value: React.SetStateAction<Tag[]>) => void
) => {
  try {
    const result = await fetchTags();
    setAllTags([...result]);
  } catch (e) {
    console.error(e);
  }
};

export const mapTags = async (
  userTags: UserTags,
  allTags: Tag[],
  setUserTagObj: (value: React.SetStateAction<Tag[]>) => void
) => {
  setUserTagObj(
    userTags.reduce((acc: Tag[], elem: string) => {
      let match = allTags.find((tag) => tag.uuid === elem);
      if (match) {
        acc.push(match);
      }
      return acc;
    }, [])
  );
};
