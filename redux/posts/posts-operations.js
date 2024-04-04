import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { getPaginatedPosts, getLastItem } from '../../firebase/services';
import {
  storage,
  db,
  postsCollection,
  imagesStorage,
  getDocById,
} from '../../firebase/config';
import fireStorage from '../../firebase/fireStorage';

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

export const updatePostOperation = createAsyncThunk(
  'posts/updatePost',
  async ({ docId, comment }, thunkAPI) => {
    try {
      await updateDoc(getDocById(docId), {
        comments: arrayUnion(comment),
      });

      return { docId, comment };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePostOperation = createAsyncThunk(
  'posts/deletePost',
  async ({ docId, photoUrl }, thunkAPI) => {
    try {
      deleteDoc(getDocById(docId));
      fireStorage.deleteImage(photoUrl);
      return { docId, photoUrl };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
