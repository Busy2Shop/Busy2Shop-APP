import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";
import { logout, updateTokens } from "../slices/authSlice";

const API_BASE_URL = "https://busy2shop-production.up.railway.app/api/v0";

// Base query with automatic token handling and refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Enhanced base query with token refresh logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 (unauthorized) response, try to refresh the token
  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      // Try to refresh the token
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { accessToken, refreshToken: newRefreshToken } =
            refreshResult.data as any;

          // Update tokens in the store
          api.dispatch(
            updateTokens({
              accessToken,
              refreshToken: newRefreshToken || refreshToken,
            })
          );

          // Retry the original query with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed, logout the user
          api.dispatch(logout());
        }
      } catch (error) {
        // Refresh failed, logout the user
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, logout the user
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Order", "Agent", "Profile"],
  endpoints: () => ({}),
});

// Type for the refresh token response
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}
