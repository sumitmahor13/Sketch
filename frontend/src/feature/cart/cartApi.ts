import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include", // cookies bhejne ke liye
  }),
  endpoints: (builder) => ({

    getUserCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ['Cart'],
    }),

    addToCart : builder.mutation({
        query: (payload) => ({
            url:'/cart/add',
            method:'POST',
            body:payload
        })
    }),

    removeFromCart: builder.mutation({
        query : (productId) => ({
            url:`/cart/delete/${productId}`,
            method:'DELETE'
        }),
        invalidatesTags: ['Cart'],
    }),

    updateCart : builder.mutation({
        query: ({productId, quantity}) => ({
            url:`/cart/update/${productId}`,
            method:"PUT",
            body: { quantity },
        }),
        invalidatesTags: ['Cart'],
    })
  }),
});

export const { useGetUserCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartMutation } = cartApi;
