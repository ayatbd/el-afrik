import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => "/order/admin/all",
            providesTags: ["Orders"],
        }),
    }),
});

export const { useGetOrdersQuery } = ordersApi;