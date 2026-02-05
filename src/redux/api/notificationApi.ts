import { apiSlice } from "./apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: (params) => ({
                url: "/notification/my-notifications",
                params,
            }),
            providesTags: ["Notification"],
        }),
        markNotificationRead: builder.mutation({
            query: (id) => ({
                url: `/notification/mark-as-read/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        })
    }),
})

export const { useGetNotificationQuery, useMarkNotificationReadMutation } = notificationApi