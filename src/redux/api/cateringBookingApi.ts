import { apiSlice } from "./apiSlice";

export const cateringBookingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCateringBooking: builder.query({
            query: (params) => ({
                url: "/catering/admin/bookings",
                method: "GET",
                params
            }),
            providesTags: ["CateringBooking"],
        }),

        createCateringBooking: builder.mutation({
            query: (data) => ({
                url: '/catering/reserve',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['CateringBooking'],
        }),

        // Updated endpoint for downloading files
        downloadInvoice: builder.query({
            query: (id) => ({
                url: `/catering/invoice/${id}`,
                method: "GET",
                // CRITICAL: This tells RTK Query to parse the response as a file/blob, not JSON
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {
    useGetCateringBookingQuery,
    useCreateCateringBookingMutation,
    useDownloadInvoiceQuery,      // Standard hook
    useLazyDownloadInvoiceQuery   // <--- YOU NEED THIS for the button click
} = cateringBookingApi;