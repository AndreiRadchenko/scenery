import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, logIn, logOut, updateUserDetails } from './auth-operations';

const initialState = {
  user: { avatar: null, nickName: null, email: null, id: null },
  isLoggedIn: null,
  isLoading: false,
  error: null,
};

const extraActions = [register, logIn, logOut, updateUserDetails];

const getActions = (actionType) =>
  extraActions.map((action) => {
    return action[actionType];
  });

const handlePending = (state) => {
  state.isLoading = true;
};

const handleSuccess = (state, { payload }) => {
  state.user.avatar = payload.avatar;
  state.user.nickName = payload.name;
  state.user.email = payload.email;
  state.user.id = payload.id;
  state.isLoggedIn = true;
};

const handleAnySuccess = (state) => {
  state.isLoading = false;
  state.error = null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError(state, action) {
      state.error = null;
    },
    updateUserProfile(state, { payload }) {
      state.user.avatar = payload.avatar;
      state.user.nickName = payload.name;
      state.user.email = payload.email;
      state.user.id = payload.id;
      state.isLoggedIn = payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleSuccess)
      .addCase(logIn.fulfilled, handleSuccess)
      .addCase(logOut.fulfilled, (state) => {
        return initialState;
      })
      .addCase(updateUserDetails.fulfilled, handleSuccess)

      .addCase(logIn.rejected, (state, { payload }) => {
        state.error = 'Login failed, please try again';
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = "Sorry, can't register user with this credentials!";
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(updateUserDetails.rejected, (state, { payload }) => {
        state.error = "Sorry, can't update user details!";
        state.isLoading = false;
      })

      .addMatcher(isAnyOf(...getActions('fulfilled')), handleAnySuccess)
      .addMatcher(isAnyOf(...getActions('pending')), handlePending);
  },
});

export const { resetAuthError, updateUserProfile } = authSlice.actions;
