import { createAsyncThunk } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { getPaginatedPosts, getLastItem } from '../../firebase/services';
// import { setLastVisiblePost, setIsEndOfPosts } from './posts-slice';
import {
  storage,
  db,
  postsCollection,
  imagesStorage,
} from '../../firebase/config';

export const fetchPostsOperation = createAsyncThunk(
  'posts/fetchAll',
  async (limits, thunkAPI) => {
    const state = thunkAPI.getState();
    const isEndOfPosts = state.posts.isEndOfPosts;

    if (isEndOfPosts) {
      return thunkAPI.rejectWithValue('end of posts');
    }
    const lastVisiblePost = state.posts.lastVisiblePost;
    try {
      const morePosts = await getPaginatedPosts(lastVisiblePost, limits);
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

export const addPostOperation = createAsyncThunk(
  'posts/addPost',
  async ({ photo, location, author, name }, thunkAPI) => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniquePhotoId = uuid.v4();
      const newImageRef = ref(imagesStorage, uniquePhotoId);
      await uploadBytes(newImageRef, file);

      const photoUrl = await getDownloadURL(newImageRef);

      const newPost = doc(postsCollection, uniquePhotoId);
      const createPost = await setDoc(newPost, {
        image: { url: photoUrl },
        location,
        // author: { id, name: nickName },
        author,
        name,
        timestamp: serverTimestamp(),
      });
      //   thunkAPI.dispatch(setLastVisiblePost(null));
      //   thunkAPI.dispatch(setIsEndOfPosts(false));

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
