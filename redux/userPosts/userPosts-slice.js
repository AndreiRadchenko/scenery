import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchUserPostsOperation } from './userPosts-operations';
import { updatePostOperation } from '../posts/posts-operations';

const initialPosts = {
  items: [],
  isLoading: false,
  error: null,
  lastVisiblePost: null,
  isEndOfPosts: false,
  newPostsCount: 0,
};

const extraActions = [fetchUserPostsOperation];

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
