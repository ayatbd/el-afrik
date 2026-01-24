import { apiSlice } from "./apiSlice";

export const dashboardData = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: (year) => `/user/dashboard/stats/${year}`,
            providesTags: ["Dashboard"],
        }),
    }),
})

export const { useGetDashboardDataQuery } = dashboardData