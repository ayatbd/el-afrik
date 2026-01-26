
import { apiSlice } from "./apiSlice";

export const adsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAds: builder.query({
            query: () => "ads/all-ads",
            providesTags: ["Ads"],
        }),
        deleteAd: builder.mutation({
            query: (id) => ({
                url: `/ads/delete-ads/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Ads"],
        }),
        createAd: builder.mutation({
            query: (data) => ({
                url: "/ads/create-ads",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Ads"],
        })
    }),
})

export const { useGetAdsQuery, useDeleteAdMutation, useCreateAdMutation } = adsApi