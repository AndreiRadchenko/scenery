import React, { useEffect, useCallback, useLayoutEffect } from 'react';
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
import { useAppState } from './hooks';

SplashScreen.preventAutoHideAsync();

export default function Main({ hideSplashScreen }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isUserLoading = useSelector(selectIsUserLoading);
  const isPostsLoading = useSelector(selectIsPostsLoading);
  const isUserPostsLoading = useSelector(selectIsUserPostsLoading);
  const isAppStateVisible = useAppState();

  useEffect(() => {
    if (!isLoggedIn && auth.currentUser && isAppStateVisible) {
      auth.currentUser.reload().then(() => {
        dispatch(
          updateUserProfile({
            avatar: auth.currentUser.photoURL,
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
            email: auth.currentUser.email,
            isLoggedIn: auth.currentUser.emailVerified,
          })
        );
      });
    }
  }, [isLoggedIn, isAppStateVisible, auth.currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        dispatch(
          updateUserProfile({
            avatar: user.photoURL,
            name: user.displayName,
            id: user.uid,
            email: user.email,
            isLoggedIn: user.emailVerified,
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
  }, [auth]);

  return (
    <>
      <Spinner
        visible={isUserLoading || isPostsLoading || isUserPostsLoading}
        // textContent={'Loading...'}
        // textStyle={{ color: 'white' }}
      />
      <UseRoute hideSplashScreen={hideSplashScreen} isLoggedIn={isLoggedIn} />
    </>
  );
}
