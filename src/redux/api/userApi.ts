import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => {
                return {
                    url: "/user/all",
                    method: "GET",
                }
            },
            providesTags: ["User"],
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/user/single/${id}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (id) => ({
                url: `/user/block-user/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: "/user",
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, useGetSingleUserQuery } = userApi;