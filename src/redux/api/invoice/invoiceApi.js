// api/banner.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoice = createApi({
  reducerPath: "invoice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),

  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (createInvoice) => ({
        url: `/products/create`,
        method: "POST",
        body: createInvoice,
      }),
    }),

    getAllInvoice: builder.query({
      query: () => "/",
    }),

    getSingleBanner: builder.query({
      query: (id) => `/banner/${id}`,
    }),

    updateBanner: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/banner/${id}`,
        method: "PUT",
        body: updateData,
      }),
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllInvoiceQuery,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = invoice;
