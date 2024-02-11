import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { authSlice } from './auth/auth-slice';
import { postsSlice } from './posts/posts-slice';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['firebase', 'firestore'],
    },
  }),
];

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
  middleware,
});

export const store = configureStore({
  reducer: rootReducer,
});
