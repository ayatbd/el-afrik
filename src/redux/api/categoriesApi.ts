import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: '/category/allCategory',
                method: 'GET',
            }),
            providesTags: ['Category'],
        })
    })
})

export const { useGetCategoriesQuery } = categoryApi