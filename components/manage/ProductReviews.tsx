"use client";

import { IProduct } from "@/backend/models/product";
import { IReview } from "@/backend/models/product";
import { revalidateTag } from "@/helpers/revalidate";
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "@/redux/api/productApi";
import { MDBDataTable } from "mdbreact";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  datas: {
    products: IProduct[];
  };
}

const ProductReviews = ({ datas }: Props) => {
  const products = datas?.products;

  const [productId, setProductId] = useState("");

  const router = useRouter();

  const [getProductReviews, { data, error }] = useLazyGetProductReviewsQuery();
  const reviews = data?.reviews || [];

  const [deleteReview, { isSuccess, isLoading }] = useDeleteReviewMutation();

  const getProductReviewsHandler = () => {
    getProductReviews(productId);
  };

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("ProductDetails");
      router.refresh();
      toast.success("Review deleted");
    }
  }, [error, isSuccess]);

  const setReviews = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "User Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    reviews?.forEach((review: IReview) => {
      data?.rows?.push({
        name: review?.user?.name,
        rating: review?.rating,
        comment: review?.comment,
        actions: (
          <>
            <button
              className="btn btn-outline-danger mx-2"
              disabled={isLoading}
              onClick={() => deleteReviewHandler(review?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteReviewHandler = (id: string) => {
    deleteReview({ id, productId });
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <div className="mb-0">
            <select
              className="form-select"
              id="room_type_field"
              onChange={(e) => setProductId(e.target.value)}
            >
              <option>Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <button
              className="btn form-btn w-100 py-2 mt-3"
              onClick={getProductReviewsHandler}
            >
              Fetch Reviews
            </button>
          </div>
        </div>
      </div>

      {reviews?.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : (
        <h5 className="mt-5 text-center">No Reviews</h5>
      )}
    </div>
  );
};

export default ProductReviews;
