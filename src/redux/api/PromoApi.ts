
import { apiSlice } from "./apiSlice";

export const promoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPromo: builder.query({
            query: () => "/promos/all",
            providesTags: ["Promo"],
        }),
        addPromo: builder.mutation({
            query: (data) => ({
                url: "/promos/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Promo"],
        }),
        deletePromo: builder.mutation({
            query: (id) => ({
                url: `/promos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Promo"],
        })
    }),
});

export const { useGetPromoQuery, useAddPromoMutation, useDeletePromoMutation } = promoApi;