import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  // Add a flag to track if email is verified but profile is incomplete
  isEmailVerified: boolean;
  verificationEmail: string | null;
  // Add profile completion tracking
  isProfileComplete: boolean;
  profileCompletionPercentage: number;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isEmailVerified: false,
  verificationEmail: null,
  isProfileComplete: false,
  profileCompletionPercentage: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = true;
      state.isEmailVerified = true;
      state.verificationEmail = null;
      state.isProfileComplete = true;
      state.profileCompletionPercentage = 100;
    },

    setVerificationToken: (
      state,
      action: PayloadAction<{
        email: string;
        accessToken: string;
      }>
    ) => {
      const { email, accessToken } = action.payload;
      state.accessToken = accessToken;
      state.verificationEmail = email;
      state.isEmailVerified = true;
      state.isAuthenticated = false;
      state.isProfileComplete = false;
      state.profileCompletionPercentage = 25;
    },

    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isProfileComplete = true;
      state.profileCompletionPercentage = 100;
      state.verificationEmail = null;
    },

    updateUserPartial: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // For updating profile completion status
    setProfileStatus: (
      state,
      action: PayloadAction<{
        isComplete: boolean;
        completionPercentage: number;
      }>
    ) => {
      const { isComplete, completionPercentage } = action.payload;
      state.isProfileComplete = isComplete;
      state.profileCompletionPercentage = completionPercentage;

      // If profile is complete and we have a token, we're fully authenticated
      if (isComplete && state.accessToken) {
        state.isAuthenticated = true;
      }
    },

    // For token refresh
    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isEmailVerified = false;
      state.verificationEmail = null;
      state.isProfileComplete = false;
      state.profileCompletionPercentage = 0;
    },

    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isEmailVerified = false;
      state.verificationEmail = null;
      state.isProfileComplete = false;
      state.profileCompletionPercentage = 0;
    },
  },
});

export const {
  setCredentials,
  setVerificationToken,
  updateUser,
  updateUserPartial,
  setProfileStatus,
  updateTokens,
  logout,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors for easier state access
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsEmailVerified = (state: { auth: AuthState }) =>
  state.auth.isEmailVerified;
export const selectIsProfileComplete = (state: { auth: AuthState }) =>
  state.auth.isProfileComplete;
export const selectProfileCompletionPercentage = (state: { auth: AuthState }) =>
  state.auth.profileCompletionPercentage;
export const selectVerificationEmail = (state: { auth: AuthState }) =>
  state.auth.verificationEmail;
