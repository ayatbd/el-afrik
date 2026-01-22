import { apiSlice } from "./apiSlice";

export const cateringApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatering: builder.query({
      query: () => `/catering/packages`,
      providesTags: ["Caterings"],
    }),
    addCatering: builder.mutation({
      query: (data) => ({
        url: "/catering/add-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Caterings"],
    }),
  }),
});

export const { useGetAllCateringQuery, useAddCateringMutation } = cateringApi;
