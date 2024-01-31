import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

import { postsCollection } from './config';

export const getLastItem = (arr) => arr.slice(-1)[0];

export const getPaginatedPosts = async (lastVisible, limits) => {
  let documentSnapshots = null;

  const q = lastVisible
    ? query(
        postsCollection,
        orderBy('timestamp', 'desc'),
        startAfter(Timestamp.fromMillis(lastVisible)),
        limit(limits)
      )
    : query(postsCollection, orderBy('timestamp', 'desc'), limit(limits));

  try {
    documentSnapshots = await getDocs(q);
    return documentSnapshots;
  } catch (e) {
    console.log(e.message);
  }
};
