import { apiSlice } from "./apiSlice";

export const aboutUs = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAboutUs: builder.query({
            query: () => ({
                url: "/about/retrive",
                method: "GET",
            }),
            providesTags: ["AboutUs"],
        }),
        updateAboutUs: builder.mutation({
            query: (data) => ({
                url: "/about/create-or-update",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AboutUs"],
        }),
    }),
});

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUs;