import { apiSlice } from "./apiSlice";

export const faqApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFaq: builder.query({
            query: () => {
                // console.log('getFaq');
                return {
                    url: '/faq/allFaq',
                    method: 'GET',
                }
            },
            providesTags: ['Faq'],
        }),
        addFaq: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: 'faq/create-faq',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Faq'],
        }),
        editFaq: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: 'faq/update-faq',
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: ['Faq'],
        })
    }),
});

export const { useGetFaqQuery, useAddFaqMutation, useEditFaqMutation } = faqApi;