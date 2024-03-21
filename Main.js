import React, { useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import * as SplashScreen from 'expo-splash-screen';

import { UseRoute } from './navigation/router';
import { db, auth } from './firebase/config';
import { updateUserProfile } from './redux/auth/auth-slice';
import {
  selectIsLoggedIn,
  selectIsLoading as selectIsUserLoading,
} from './redux/auth/auth-selector';
import { selectIsLoading as selectIsPostsLoading } from './redux/posts/posts-selectors';
import { selectIsLoading as selectIsUserPostsLoading } from './redux/userPosts/userPosts-selectors';

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isUserLoading = useSelector(selectIsUserLoading);
  const isPostsLoading = useSelector(selectIsPostsLoading);
  const isUserPostsLoading = useSelector(selectIsUserPostsLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            avatar: user.photoURL,
            name: user.displayName,
            id: user.uid,
            email: user.email,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(
          updateUserProfile({
            avatar: null,
            name: null,
            id: null,
            email: null,
            isLoggedIn: false,
          })
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Spinner
        visible={isUserLoading || isPostsLoading || isUserPostsLoading}
        // textContent={'Loading...'}
        // textStyle={{ color: 'white' }}
      />
      <UseRoute isLoggedIn={isLoggedIn} />
    </>
  );
}
