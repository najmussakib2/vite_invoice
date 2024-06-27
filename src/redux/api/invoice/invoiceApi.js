// api/banner.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoice = createApi({
  reducerPath: "invoice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://express-invoice.vercel.app/api/v1",
  }),

  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (createInvoice) => ({
        url: `/invoice`,
        method: "POST",
        body: createInvoice,
      }),
    }),

    getAllInvoice: builder.query({
      query: () => "/invoice",
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
  useCreateInvoiceMutation,
  useGetAllInvoiceQuery,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = invoice;
