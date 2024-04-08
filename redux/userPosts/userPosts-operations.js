import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPaginatedUserPosts, getLastItem } from '../../firebase/services';

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
