// api/banner.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoice = createApi({
  reducerPath: "invoice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://express-invoice.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
  }),

  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (createInvoice) => ({
        url: `/invoice`,
        method: "POST",
        body: createInvoice,
      }),
    }),

    // getAllInvoice: builder.query({
    //   query: () => "/invoice",
    // }),

    getAllInvoice: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/invoice",
          method: "GET",
          params,
        };
      },
      providesTags: ["invoice"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
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
