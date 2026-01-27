import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (params) => {
                return {
                    url: "/order/admin/all",
                    method: "GET",
                    params: params,
                }
            },
            providesTags: ["Orders"],
        }),
        getSingleOrder: builder.query({
            query: (id) => `/order/admin/${id}`,
            providesTags: ["Orders"],
        }),
        orderStats: builder.query({
            query: () => "/order/admin/stats",
            providesTags: ["Stats"],
        })
    }),
});

export const { useGetOrdersQuery, useGetSingleOrderQuery, useOrderStatsQuery } = ordersApi;