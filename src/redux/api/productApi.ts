import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => {
                console.log('getProducts');
                return {
                    url: '/product/allProduct',
                    method: 'GET',
                    params: params
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
            query: ({ id, data }) => {
                // console.log(data);
                return {
                    url: `product/update-product/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => {
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