import { apiSlice } from "./apiSlice";

export const qrApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQr: builder.query({
      query: (params) => ({
        url: "qrcode/all",
        method: "GET",
        params
      }),
      providesTags: ["Qr"],
    }),
    createQr: builder.mutation({
      query: (data) => ({
        url: "/qrcode/generate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Qr"],
    })
  }),
});

export const { useGetQrQuery, useCreateQrMutation } = qrApi;
