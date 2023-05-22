import { UserTag, UserTags } from '../types';
import { fetchTags } from '../api';
import { SetStateAction } from 'react';

export const getAllTags = async (
  setAllTags: (value: SetStateAction<UserTag[]>) => void
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
  allTags: UserTag[],
  setUserTagObj: (value: SetStateAction<UserTag[]>) => void
) => {
  setUserTagObj(
    userTags.reduce((acc: UserTag[], elem: string) => {
      let match = allTags.find((tag) => tag.uuid === elem);
      if (match) {
        acc.push(match);
      }
      return acc;
    }, [])
  );
};

export const clear = (
  setShow: (value: SetStateAction<boolean>) => void,
  setValue: (value: SetStateAction<string>) => void
) => {
  setShow(false);
  setValue('');
};
