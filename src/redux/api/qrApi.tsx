import { apiSlice } from "./apiSlice";

export const qrApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQr: builder.query({
      query: () => "qrcode/all",
      providesTags: ["Qr"],
    }),
  }),
});

export const { useGetQrQuery } = qrApi;
