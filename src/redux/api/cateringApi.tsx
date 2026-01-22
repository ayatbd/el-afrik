import { apiSlice } from "./apiSlice";

export const cateringApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/catering/categories`,
      providesTags: ["Categories"],
    }),
    addCatering: builder.mutation({
      query: (data) => ({
        url: "/catering/add-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCateringMutation } = cateringApi;
