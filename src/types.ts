export type User = {
  uuid: string;
  fullName: string;
  tags: string[];
};

type TagColors = {
  primary: string;
  secondary: string;
};

export type UserTag = {
  uuid: string;
  title: string;
  color: TagColors;
};

export type UserTags = string[];
