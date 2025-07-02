import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include", // for cookie to be sent
  }),
  endpoints: (builder) => ({

    checkAuth: builder.query<any, void>({
      query: () => '/auth/check-auth',
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    register: builder.mutation({
      query: (payload) => ({
        url:"/auth/register",
        method:"POST",
        body: payload,
      })
    }),
    
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url:"/auth/verify-otp",
        method:"POST",
        body: payload,
      })
    }),

    forgetPassword: builder.mutation({
      query: (payload) => ({
        url:"/auth/forget-password",
        method:"POST",
        body: payload,
      })
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url:"/auth/reset-password",
        method:"POST",
        body: payload,
      })
    })
  }),
});

export const { useCheckAuthQuery, useLoginUserMutation, useLogoutMutation, useRegisterMutation, useForgetPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation } = authApi;
