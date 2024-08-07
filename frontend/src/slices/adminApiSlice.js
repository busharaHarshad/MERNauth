import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials
      })
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: '/admin/users',
        method: 'GET',
        
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE'
      })
    }),
    searchUsers: builder.query({
      query: (query) => ({
        url: '/admin/search',
        params: { query }
      })
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  })
});

export const {useAdminLoginMutation,useGetUsersMutation, useDeleteUserMutation,useSearchUsersQuery,useUpdateUserMutation} = adminApiSlice;
