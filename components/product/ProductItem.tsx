"use client";

import { IProduct } from "@/backend/models/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";

interface Props {
  product: IProduct;
}

const ProductItem = ({ product }: Props) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      <div className="card-home  w-100 position-relative">
        <img
          className="card-img"
          src={
            product?.images?.length > 0
              ? product.images[0].url
              : "/images/default_product_image.png"
          }
          alt={product?.name}
        />
        <div className="card-body-home  position-absolute  ">
          <h5 className="card-title">
            <Link href={`/products/${product?._id}`}>{product?.name}</Link>
          </h5>
          <div className="">
            <p className="card-text mt-2">
              <b>${product?.price}</b>
            </p>
          </div>
          <div>
            <div className="d-flex">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#e61e4d"
                starEmptyColor="#2e2e2e"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="1px"
                name="rating"
              />
              <span className="no-of-reviews">
                ({product?.numOfReviews} Reviews)
              </span>
            </div>
            <Link
              className="btn view-btn mt-3 w-100"
              href={`/products/${product?._id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
