import { UserTags, Tag } from '../types';
import { fetchUserTags, fetchTags } from '../api';

export const getUserTags = async (
  userID: string,
  setUserTags: (value: React.SetStateAction<UserTags>) => void
) => {
  try {
    const result = await fetchUserTags(userID);
    console.log(result);
    setUserTags([...result]);
  } catch (e) {
    console.error(e);
  }
};

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
