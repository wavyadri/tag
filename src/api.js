// import uuid from 'uuid/dist/v4';
import { v4 as uuid } from 'uuid';

/**
 * Parameters
 */
const latency = 500;

/**
 * Mocked data storage
 */
const tags = [
  {
    uuid: 'aaaa-bbbb-cccc-dddd',
    title: 'Donor',
    color: { primary: '#C8E8FF', secondary: '#2e536e' },
  },
  {
    uuid: 'eeee-ffff-gggg-hhhh',
    title: 'Fundraiser',
    color: { primary: '#B2419A', secondary: '#ffedff' },
  },
  {
    uuid: 'iiii-jjjj-kkkk-llll',
    title: 'Test',
    color: { primary: '#B7EDD5', secondary: '#1f543c' },
  },
  {
    uuid: 'mmmm-nnnn-oooo-pppp',
    title: 'Teeestbutloooooooooooooong',
    color: { primary: '#EDB7B7', secondary: '#783D3B' },
  },
  {
    uuid: 'qqqq-rrrr-ssss-tttt',
    title: 'test 2',
    color: { primary: '#4654B2', secondary: '#d7dbfc' },
  },
];

const users = [
  {
    uuid: '1111-2222-3333-4444',
    fullName: 'Aizah Wilkerson',
    tags: ['aaaa-bbbb-cccc-dddd', 'eeee-ffff-gggg-hhhh'],
  },
];

const tagColors = [
  { primary: '#C8E8FF', secondary: '#2e536e' },
  { primary: '#B2419A', secondary: '#ffedff' },
  { primary: '#B7EDD5', secondary: '#1f543c' },
  { primary: '#EDB7B7', secondary: '#783D3B' },
  { primary: '#4654B2', secondary: '#d7dbfc' },
];

/**
 * Chooses a random tag color
 * @returns {string} The generated color
 */
const generateTagColor = () => {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
};

/**
 * Fetch all available tags
 * @returns {Promise<tag[]>} An array of all tags
 */
export const fetchTags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tags);
    }, latency);
  });
};

/**
 * Save a new tag
 * @param {tag} newTag - The data for a new tag to be created
 * @returns {Promise<tag>} The resulting tag model including uuid
 */
export const createTag = (newTag) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const constructedTag = {
        uuid: uuid(), // UUID is automatically generated on submission
        title: newTag.title,
        color: generateTagColor(),
      };
      tags.push(constructedTag);
      resolve(constructedTag);
    }, latency);
  });
};

/**
 * Fetch a user
 * @param {string} uuid - The UUID of the user to find
 * @returns {Promise<user>} A user object with the matching UUID
 */
export const fetchUser = (uuid) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.uuid === uuid);
      resolve(user);
    }, latency);
  });
};

/**
 * Fetch a user's tags
 * @param {string} uuid - The UUID of the user to find
 * @returns {Promise<tag[]>} An array of tags assigned to the user with the matching UUID
 */
export const fetchUserTags = (userUuid) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.uuid === userUuid);
      resolve(user.tags);
    }, latency);
  });
};

/**
 * Assign a tag to a user
 * @param {string} userUuid - The UUID of the user to apply the tag to
 * @param {string} tagUuid - The UUID of the tag to be applied
 * @returns {Promise<user>} The updated user model, including the new value for the `tags` array
 */
export const assignUserTag = (userUuid, tagUuid) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.uuid === userUuid);
      user.tags.push(tagUuid);
      resolve(user);
    }, latency);
  });
};

/**
 * Remove a tag from a user
 * @param {string} userUuid - The UUID of the user to remove the tag from
 * @param {string} tagUuid - The UUID of the tag to be removed
 * @returns {Promise<user>} The updated user model, including the new value for the `tags` array
 */
export const removeUserTag = (userUuid, tagUuid) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.uuid === userUuid);
      user.tags = user.tags.filter((t) => t !== tagUuid);
      resolve(user);
    }, latency);
  });
};
