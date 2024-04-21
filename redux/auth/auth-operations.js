import { Alert } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  AuthErrorCodes,
  updateProfile,
} from 'firebase/auth';

import { db, auth, avatarStorage, storage } from '../../firebase/config';
import fireStorage from '../../firebase/fireStorage';
import { openMailClient } from '../../helpers/openMailClient';

const emailVerification = async () => {
  try {
    await sendEmailVerification(
      auth.currentUser
      // , {
      // handleCodeInApp: true,
      // url: 'https://scenery-53dd5.firebaseapp.com',
      // }
    );
    Alert.alert(
      'Email verification',
      'Please confirm your email and login with your credentials',
      [
        {
          text: 'Open Email Client',
          onPress: openMailClient,
        },
        {
          text: 'Dismiss',
          onPress: () => {},
        },
      ]
    );
  } catch (error) {
    console.error(
      'Email verification error: code, message',
      error.code,
      error.message
    );
    throw error;
  }
};

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
            userId: user.uid,
          })
        : { photoUrl: '', uniquePhotoId: '' };

      await updateProfile(user, { displayName: name, photoURL: photoUrl });

      if (user.emailVerified === false) {
        await emailVerification();
        // await signOut(auth);
      }

      return {
        avatar: user.photoURL,
        name: user.displayName,
        id: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
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
      if (user.emailVerified === false) {
        Alert.alert(
          'Email verification',
          'Please check your email to confirm the address you provided. ',
          [
            {
              text: 'Resend verification email',
              onPress: () => {
                emailVerification();
              },
            },
            {
              text: 'Open Email Client',
              onPress: openMailClient,
            },
          ]
        );
      }
      return {
        avatar: user.photoURL,
        name: user.displayName,
        id: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ email }, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Sent',
        `An email has been sent to ${email} with instructions for how to reset your Scenery password.`,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]
      );
      return 'Password has been reset';
    } catch (error) {
      console.log(error.message);
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
            userId: currentUser.uid,
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
        emailVerified: currentUser.emailVerified,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
