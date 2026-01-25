
import { apiSlice } from "./apiSlice";

export const promo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPromo: builder.query({
            query: (id) => `/profile/${id}`,
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
    }),
});

export const { useGetPromoQuery, useAddPromoMutation } = promo;