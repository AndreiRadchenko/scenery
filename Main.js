import React, { useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import * as SplashScreen from 'expo-splash-screen';

import { UseRoute } from './navigation/router';
import { db, auth } from './firebase/config';
import { fetchCurrentUser } from './redux/auth/auth-operations';
import { updateUserProfile } from './redux/auth/auth-slice';
import { selectIsLoggedIn, selectIsLoading } from './redux/auth/auth-selector';

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            name: user.displayName,
            id: user.uid,
            email: user.email,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(
          updateUserProfile({
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
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: 'white' }}
      />
      <UseRoute isLoggedIn={isLoggedIn} />
    </>
  );
}
