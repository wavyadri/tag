import { Tag } from '../types';
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

// export const selectTag = async (userID: string, tagID: string) => {
//   try {
//     setShowInput(false);
//     await assignUserTag(userID, tagID);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await getUserTags(userID);
//     await mapTags();
//     setInput('');
//   }
// };
