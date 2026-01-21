import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => "/order/admin/all",
            providesTags: ["Orders"],
        }),
        getSingleOrder: builder.query({
            query: (id) => `/order/admin/${id}`,
        })
    }),
});

export const { useGetOrdersQuery, useGetSingleOrderQuery } = ordersApi;