import { createSelector } from '@reduxjs/toolkit';

export const selectUserPosts = (state) => state.userPosts.items;
export const selectUserPostById = (id) => {
  return createSelector(selectUserPosts, (items) =>
    items.find((e) => e._id === id)
  );
};
export const selectIsLoading = (state) => state.userPosts.isLoading;
export const selectError = (state) => state.userPosts.error;
export const selectLastVisiblePost = (state) => state.userPosts.lastVisiblePost;
export const selectIsEndOfPosts = (state) => state.userPosts.isEndOfPosts;
