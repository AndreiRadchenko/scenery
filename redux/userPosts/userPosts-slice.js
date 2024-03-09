import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchUserPostsOperation,
  addUserPostOperation,
  // deletePostOperation,
} from './userPosts-operations';
import { getPaginatedPosts, getLastItem } from '../../firebase/services';

const initialPosts = {
  items: [],
  isLoading: false,
  error: null,
  lastVisiblePost: null,
  isEndOfPosts: false,
  newPostsCount: 0,
};

const extraActions = [
  fetchUserPostsOperation,
  addUserPostOperation,
  //   deletePostOperation,
];

const getActions = (actionType) =>
  extraActions.map((action) => {
    return action[actionType];
  });

const handlePending = (state) => {
  state.isLoading = true;
};

const handleAnySuccess = (state) => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState: initialPosts,
  reducers: {
    resetUserPostsState(state) {
      state.items = [];
      state.lastVisiblePost = null;
      state.isEndOfPosts = false;
    },
    resetPostError(state, action) {
      state.error = null;
    },
    resetPosts(state, action) {
      state.items = [];
    },
    setLastVisiblePost(state, { payload }) {
      state.lastVisiblePost = payload;
    },
    setIsEndOfPosts(state, { payload }) {
      state.isEndOfPosts = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserPostsOperation.fulfilled,
        (state, { payload: { posts, lastVisiblePost, isEndOfPosts } }) => {
          state.items = [...state.items, ...posts];
          state.lastVisiblePost = lastVisiblePost;
          state.isEndOfPosts = isEndOfPosts;
        }
      )

      .addCase(addUserPostOperation.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.lastVisiblePost = null;
        state.isEndOfPosts = false;
      })

      //   .addCase(deletePostOperation.fulfilled, (state, action) => {
      //     const index = state.items.findIndex((e) => e.id === action.payload.id);
      //     state.items.splice(index, 1);
      //   })

      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleAnySuccess)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const userPostsReducer = userPostsSlice.reducer;
export const {
  resetUserPostsState,
  resetPostError,
  resetPosts,
  setLastVisiblePost,
  setIsEndOfPosts,
} = userPostsSlice.actions;
