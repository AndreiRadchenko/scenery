export const selectUserPosts = (state) => state.userPosts.items;
export const selectIsLoading = (state) => state.userPosts.isLoading;
export const selectError = (state) => state.userPosts.error;
export const selectLastVisiblePost = (state) => state.userPosts.lastVisiblePost;
export const selectIsEndOfPosts = (state) => state.userPosts.isEndOfPosts;
