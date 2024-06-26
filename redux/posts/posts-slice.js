import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchPostsOperation,
  addPostOperation,
  updatePostOperation,
  deletePostOperation,
} from './posts-operations';

const initialPosts = {
  items: [],
  isLoading: false,
  error: null,
  lastVisiblePost: null,
  isEndOfPosts: false,
  newPostsCount: 0,
};

const extraActions = [
  fetchPostsOperation,
  addPostOperation,
  deletePostOperation,
  updatePostOperation,
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

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    resetPostsState(state) {
      state.items = [];
      state.error = null;
      state.lastVisiblePost = null;
      state.isEndOfPosts = false;
      state.newPostsCount = 0;
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
        fetchPostsOperation.fulfilled,
        (state, { payload: { posts, lastVisiblePost, isEndOfPosts } }) => {
          state.items = [...state.items, ...posts];
          state.lastVisiblePost = lastVisiblePost;
          state.isEndOfPosts = isEndOfPosts;
        }
      )

      .addCase(addPostOperation.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.lastVisiblePost = null;
        state.isEndOfPosts = false;
      })

      .addCase(
        updatePostOperation.fulfilled,
        (state, { payload: { docId, comment, userId, isPostLiked } }) => {
          const index = state.items.findIndex((e) => e._id === docId);
          if (index > -1) {
            const { comments, likes } = state.items[index];
            if (comment) {
              if (!comments) {
                state.items[index].comments = [comment];
              } else {
                state.items[index].comments.push(comment);
              }
            }
            if (userId) {
              if (!likes) {
                state.items[index].likes = [userId];
              } else {
                isPostLiked
                  ? state.items[index].likes.splice(
                      likes.findIndex((e) => e === userId),
                      1
                    )
                  : state.items[index].likes.push(userId);
              }
            }
          }
        }
      )

      .addCase(
        updatePostOperation.rejected,
        (state, { payload: { error, docId } }) => {
          const index = state.items.findIndex((e) => e._id === docId);
          if (index > -1 && error === 'not-found') {
            state.items.splice(index, 1);
            state.error = error;
          }
        }
      )

      .addCase(deletePostOperation.fulfilled, (state, action) => {
        state.items = [];
        state.lastVisiblePost = null;
        state.isEndOfPosts = false;
      })

      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleAnySuccess)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const postsReducer = postsSlice.reducer;
export const {
  resetPostsState,
  resetPostError,
  resetPosts,
  setLastVisiblePost,
  setIsEndOfPosts,
} = postsSlice.actions;
