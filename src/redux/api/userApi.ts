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
        blockUser: builder.mutation({
            query: (id) => ({
                url: `/user/block-user/${id}`, // or whatever your endpoint is
                method: "PATCH", // or PUT/POST
                body: { status: 'blocked' } // if needed
            }),
            invalidatesTags: ["User"], // Important to auto-refresh the table list
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

export const { useGetUserQuery, useBlockUserMutation, useDeleteUserMutation, useGetSingleUserQuery } = userApi;