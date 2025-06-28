import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types/User";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include", // for cookie to be sent
  }),
  endpoints: (builder) => ({

    checkAuth: builder.query({
      query: () => '/auth/check-auth',
    }),

    loginUser: builder.mutation<User, { email: string; password: string }>({
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
        url:"/auth/register",
        method:"POST",
        body: payload,
      })
    })
  }),
});

export const { useCheckAuthQuery, useLoginUserMutation, useLogoutMutation, useRegisterMutation } = authApi;
