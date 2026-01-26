import { apiSlice } from "./apiSlice";

export const cateringBookingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCateringBooking: builder.query({
            query: () => "/catering/admin/bookings",
            providesTags: ["CateringBooking"],
        }),
        downloadInvoice: builder.query({
            query: (id) => `/catering/invoice/${id}`,
            providesTags: ["CateringBooking"],
        }),
    }),
})

export const { useGetCateringBookingQuery, useDownloadInvoiceQuery } = cateringBookingApi