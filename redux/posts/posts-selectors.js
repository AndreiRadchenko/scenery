import { createSelector } from '@reduxjs/toolkit';

export const selectPosts = (state) => state.posts.items;
export const selectPostById = (id) => {
  return createSelector(selectPosts, (items) =>
    items.find((e) => e._id === id)
  );
};
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectError = (state) => state.posts.error;
export const selectLastVisiblePost = (state) => state.posts.lastVisiblePost;
export const selectIsEndOfPosts = (state) => state.posts.isEndOfPosts;
