import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (params) => {
                return {
                    url: "/user/all",
                    method: "GET",
                    params: params,
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
        // UPDATE THIS MUTATION
        blockUser: builder.mutation({
            // We now expect an object: { id: "123", data: { status: "blocked" } }
            query: ({ id, data }) => ({
                url: `/user/block-user/${id}`, // Verify if your backend uses /users/:id or /users/:id/block
                method: "PATCH",
                body: data, // This sends { status: "active" } or { status: "blocked" }
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

export const { useGetUserQuery, useBlockUserMutation, useDeleteUserMutation, useGetSingleUserQuery } = userApi;