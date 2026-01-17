import { apiSlice } from "./apiSlice";

export const faqApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFaq: builder.query({
            query: () => {
                console.log('getFaq');
                return {
                    url: '/faq/allFaq',
                    method: 'GET',
                }
            },
            providesTags: ['Faq'],
        }),
    }),
});

export const { useGetFaqQuery } = faqApi;