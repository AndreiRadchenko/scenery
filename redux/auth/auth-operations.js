import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  updateProfile,
} from 'firebase/auth';

import { db, auth, avatarStorage, storage } from '../../firebase/config';
import fireStorage from '../../firebase/fireStorage';

export const register = createAsyncThunk(
  'auth/register',
  async ({ avatar, name, email, password }, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { photoUrl, uniquePhotoId } = avatar
        ? await fireStorage.uploadImage({
            storage: avatarStorage,
            image: avatar,
          })
        : { photoUrl: '', uniquePhotoId: '' };

      await updateProfile(user, { displayName: name, photoURL: photoUrl });

      return {
        avatar: user.photoURL,
        name: user.displayName,
        id: user.uid,
        email: user.email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return {
        avatar: user.photoURL,
        name: user.displayName,
        id: user.uid,
        email: user.email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return 'User has logged out';
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async ({ avatar = '', name = '' }, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      const { currentUser } = auth;

      const { photoUrl, uniquePhotoId } = avatar
        ? await fireStorage.uploadImage({
            storage: avatarStorage,
            image: avatar,
          })
        : { photoUrl: '', uniquePhotoId: '' };
      !photoUrl && (await fireStorage.deleteImage(currentUser.photoURL));

      await updateProfile(currentUser, {
        displayName: name || currentUser.displayName,
        photoURL: photoUrl,
      });

      await currentUser.reload();

      return {
        avatar: currentUser.photoURL,
        name: currentUser.displayName,
        id: currentUser.uid,
        email: currentUser.email,
      };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // console.log('Токена нет, уходим из fetchCurrentUser');
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
