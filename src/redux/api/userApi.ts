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

        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: "/user",
                method: "PUT",
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: "/user",
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;