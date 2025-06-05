import { apiSlice } from "./apiSlice";
import {
  User,
  AuthResponse,
  AuthResponseData,
  OTPVerificationResponseData,
  LoginCredentials,
  RegisterData,
  ApiResponse,
} from "../../types/auth";

interface OTPVerificationData {
  email: string;
  otpCode: string;
}

interface ResendOTPData {
  email: string;
}

interface AgentRegistrationData {
  firstName: string;
  lastName: string;
  otherName: string;
  displayImage: string;
  dob: string; // YYYY-MM-DD format
  gender: "male" | "female";
  location: {
    country: string;
    city: string;
    address: string;
  };
  phone: {
    countryCode: string;
    number: string;
  };
  password: string;
}

interface DocumentUploadResponse {
  message: string;
  documents: {
    ninSlip?: string;
    proofOfAddress?: string;
  };
}

interface NinSubmissionData {
  nin: string;
}

interface NinSubmissionResponse {
  message: string;
  nin: string;
  verified: boolean;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/agent/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (
        response: ApiResponse<AuthResponseData>
      ): AuthResponse => {
        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
      },
      invalidatesTags: ["User"],
    }),

    register: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      transformResponse: (
        response: ApiResponse<AuthResponseData>
      ): AuthResponse => {
        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
      },
      invalidatesTags: ["User"],
    }),

    registerAgent: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: "/auth/agent/signup",
        method: "POST",
        body: userData,
      }),
      transformResponse: (
        response: ApiResponse<AuthResponseData>
      ): AuthResponse => {
        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
      },
      invalidatesTags: ["User"],
    }),

    verifyAgent: builder.mutation<
      { email: string; accessToken: string },
      OTPVerificationData
    >({
      query: (verificationData) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: verificationData,
      }),
      transformResponse: (
        response: ApiResponse<OTPVerificationResponseData>
      ) => {
        return {
          email: response.data.email,
          accessToken: response.data.accessToken,
        };
      },
      invalidatesTags: ["User"],
    }),

    resendAgentOTP: builder.mutation<{ message: string }, ResendOTPData>({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<{ message: string }>) => {
        return { message: response.message };
      },
    }),

    completeProfile: builder.mutation<User, Partial<AgentRegistrationData>>({
      query: (userData) => ({
        url: "/auth/complete-account",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>): User => {
        return response.data;
      },
      invalidatesTags: ["User"],
    }),
    uploadDocuments: builder.mutation<DocumentUploadResponse, FormData>({
      query: (formData) => ({
        url: "/kyc/images",
        method: "POST",
        body: formData,
      }),
      transformResponse: (
        response: ApiResponse<DocumentUploadResponse>
      ): DocumentUploadResponse => {
        return response.data;
      },
      invalidatesTags: ["User"],
    }),

    submitNin: builder.mutation<NinSubmissionResponse, NinSubmissionData>({
      query: (ninData) => ({
        url: "/kyc/nin",
        method: "POST",
        body: ninData,
      }),
      transformResponse: (
        response: ApiResponse<NinSubmissionResponse>
      ): NinSubmissionResponse => {
        return response.data;
      },
      invalidatesTags: ["User"],
    }),

    registerCustomer: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: "/auth/customer/signup",
        method: "POST",
        body: userData,
      }),
      transformResponse: (
        response: ApiResponse<AuthResponseData>
      ): AuthResponse => {
        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
      },
      invalidatesTags: ["User"],
    }),

    verifyCustomer: builder.mutation<
      { email: string; accessToken: string },
      OTPVerificationData
    >({
      query: (verificationData) => ({
        url: "/auth/customer/verify-email",
        method: "POST",
        body: verificationData,
      }),
      transformResponse: (
        response: ApiResponse<OTPVerificationResponseData>
      ) => {
        return {
          email: response.data.email,
          accessToken: response.data.accessToken,
        };
      },
      invalidatesTags: ["User"],
    }),

    resendCustomerOTP: builder.mutation<{ message: string }, ResendOTPData>({
      query: (data) => ({
        url: "/auth/customer/resend-otp",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<{ message: string }>) => {
        return { message: response.message };
      },
    }),

    getProfile: builder.query<User, void>({
      query: () => "/users/profile",
      transformResponse: (response: ApiResponse<User>): User => {
        return response.data;
      },
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>): User => {
        return response.data;
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRegisterAgentMutation,
  useRegisterCustomerMutation,
  useVerifyAgentMutation,
  useVerifyCustomerMutation,
  useCompleteProfileMutation,
  useResendAgentOTPMutation,
  useResendCustomerOTPMutation,
  useGetProfileQuery,
  useUploadDocumentsMutation,
  useSubmitNinMutation,
  useUpdateProfileMutation,
} = userApiSlice;
