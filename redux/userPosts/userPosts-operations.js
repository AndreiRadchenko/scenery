import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

import { getPaginatedUserPosts, getLastItem } from '../../firebase/services';
import {
  storage,
  db,
  postsCollection,
  imagesStorage,
} from '../../firebase/config';
import fireStorage from '../../firebase/fireStorage';

export const fetchUserPostsOperation = createAsyncThunk(
  'userPosts/fetchAll',
  async ({ limits, user }, thunkAPI) => {
    const state = thunkAPI.getState();
    const isEndOfPosts = state.userPosts.isEndOfPosts;

    if (isEndOfPosts) {
      return thunkAPI.rejectWithValue('end of posts');
    }
    const lastVisiblePost = state.userPosts.lastVisiblePost;
    try {
      const morePosts = await getPaginatedUserPosts(
        lastVisiblePost,
        limits,
        user
      );
      if (morePosts.docs.length) {
        const postsMapped = morePosts.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id,
        }));
        return {
          isEndOfPosts: false,
          posts: postsMapped.map((doc) => ({
            ...doc,
            timestamp: doc.timestamp.toMillis(),
          })),
          lastVisiblePost: getLastItem(morePosts.docs)
            .data()
            .timestamp.toMillis(),
        };
      } else {
        return { isEndOfPosts: true, lastVisiblePost, posts: [] };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserPostOperation = createAsyncThunk(
  'userPosts/addPost',
  async ({ photo, location, author, name }, thunkAPI) => {
    try {
      const { photoUrl, uniquePhotoId } = await fireStorage.uploadImage({
        storage: imagesStorage,
        image: photo,
      });

      const newPost = doc(postsCollection, uniquePhotoId);
      const createPost = await setDoc(newPost, {
        image: { url: photoUrl },
        location,
        author,
        name,
        timestamp: serverTimestamp(),
      });

      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactOperation = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete('/contacts/' + contactId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
