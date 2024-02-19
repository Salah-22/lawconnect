import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    canUserReview: builder.query({
      query(id) {
        return {
          url: `/reviews/can_review?productId=${id}`,
        };
      },
    }),
    postReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
    }),
    newProduct: builder.mutation({
      query(body) {
        return {
          url: "/user/products",
          method: "POST",
          body,
        };
      },
    }),
    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/user/products/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/user/products/${id}/upload_images`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/user/products/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
    }),
    uploadProductFiles: builder.mutation({
      query({ id, body }) {
        return {
          url: `/user/products/${id}/upload_files`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteProductFile: builder.mutation({
      query({ id, body }) {
        return {
          url: `/user/products/${id}/delete_file`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/user/products/${id}`,
          method: "DELETE",
        };
      },
    }),
    getProductReviews: builder.query({
      query(id) {
        return {
          url: `user/products/reviews?productId=${id}`,
        };
      },
      providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query({ id, productId }) {
        return {
          url: `/user/products/reviews/?id=${id}&productId=${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useCanUserReviewQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useUploadProductFilesMutation,
  useDeleteProductFileMutation,
  useDeleteProductMutation,
  useLazyGetProductReviewsQuery,
  useDeleteReviewMutation,
} = productApi;
