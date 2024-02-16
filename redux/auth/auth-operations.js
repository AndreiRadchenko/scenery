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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';

import { db, auth, avatarStorage } from '../../firebase/config';

export const register = createAsyncThunk(
  'auth/register',
  async ({ avatar, name, email, password }, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let photoUrl = null;
      if (avatar) {
        const response = await fetch(avatar);
        const file = await response.blob();

        const uniquePhotoId = uuid.v4();
        const newImageRef = ref(avatarStorage, uniquePhotoId);
        await uploadBytes(newImageRef, file);

        photoUrl = await getDownloadURL(newImageRef);
      }

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
