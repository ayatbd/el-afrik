import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => {
                console.log('getProducts');
                return {
                    url: '/product/allProduct',
                    method: 'GET',
                }
            },
            providesTags: ['Product'],
        }),
        addProducts: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: 'product/create-product',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Product'],
        }),
        editProduct: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: 'product/update-product',
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => {
                console.log(id);
                return {
                    url: `/product/delete-product/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Product'],
        })
    }),
});

export const { useGetProductsQuery, useAddProductsMutation, useEditProductMutation, useDeleteProductMutation } = productApi;