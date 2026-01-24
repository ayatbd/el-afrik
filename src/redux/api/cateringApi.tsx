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
    editCatering: builder.mutation({
      query: ({ id, data }) => ({
        url: `/catering/edit-package/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Caterings"],
    }),
    deleteCatering: builder.mutation({
      query: (id) => ({
        url: `/catering/delete-package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Caterings"],
    }),
  }),
});

export const {
  useGetAllCateringQuery,
  useAddCateringMutation,
  useEditCateringMutation,
  useDeleteCateringMutation,
} = cateringApi;
