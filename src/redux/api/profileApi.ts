import { apiSlice } from "./apiSlice";

export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "/user/my-profile",
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation({

            query: (data) => {
                console.log(data);
                return {
                    url: "/user/edit-profile",
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;