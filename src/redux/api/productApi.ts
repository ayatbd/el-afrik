import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => {
                // console.log('getProducts');
                return {
                    url: '/product/allProduct',
                    method: 'GET',
                }
            },
            providesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery } = productApi;