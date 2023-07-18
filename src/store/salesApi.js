import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const salesApi = createApi({
  reducerPath: 'salesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3009' }),
  endpoints: (builder) => ({
    fetchSales: builder.query({
      query: (options = { pageParam: 1, limit: 10 }) => ({
        url: '/country',
        params: { _page: options.pageParam, _limit: options.limit },
      }),
    }),
  }),
});

export const { useFetchSalesQuery } = salesApi;

export default salesApi;
