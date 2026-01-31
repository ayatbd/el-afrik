import { IParam } from "@/types/global.type";
import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args !== undefined && args.length > 0) {
                    args.forEach((item: IParam) => {
                        if (item.value) {
                            params.append(item.name, item.value);
                        }
                    });
                }
                return {
                    url: "/order/admin/all",
                    method: "GET",
                    params: params,
                };
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