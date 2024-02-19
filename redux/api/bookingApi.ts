import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query(body) {
        return {
          url: "/bookings",
          method: "POST",
          body,
        };
      },
    }),

    stripeCheckout: builder.query({
      query({ id, checkoutData }) {
        return {
          url: `/payment/checkout_session/${id}`,
          params: {
            amount: checkoutData.amount,
          },
        };
      },
    }),

    getSalesStats: builder.query({
      query({ startDate, endDate }) {
        return {
          url: `/user/sales_stats?startDate=${startDate}&endDate=${endDate}`,
        };
      },
    }),
    deleteBooking: builder.mutation({
      query(id) {
        return {
          url: `/user/bookings/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useNewBookingMutation,
  useLazyStripeCheckoutQuery,
  useLazyGetSalesStatsQuery,
  useDeleteBookingMutation,
} = bookingApi;
