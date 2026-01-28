import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (params) => ({
                url: '/category/allCategory',
                method: 'GET',
                params,
            }),
            providesTags: ['Category'],
        }),
        editCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/category/update-category/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: 'category/create-category',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/delete-category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    })
})

export const { useGetCategoriesQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation } = categoryApi