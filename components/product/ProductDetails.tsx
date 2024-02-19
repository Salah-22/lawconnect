"use client";

import { IProduct } from "@/backend/models/product";
import StarRatings from "react-star-ratings";
import ProductImageSlider from "./ProductImageSlider";
import BuyProduct from "./BuyProduct";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";

interface Props {
  data: {
    product: IProduct;
  };
}

const ProductDetails = ({ data }: Props) => {
  const { product } = data;

  return (
    <div className="container container-fluid">
      <div
        style={{
          display: "flex",
          gap: "10rem",
          width: "90%",
          marginTop: "1rem",
        }}
      >
        <ProductImageSlider images={product?.images} />
        <div>
          <h2 className="mt-5">{product.name}</h2>
          <h5>By: {product?.user?.name}</h5>

          <div className="ratings mt-auto mb-3">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#e61e4d"
              numberOfStars={5}
              starDimension="22px"
              starSpacing="1px"
              name="rating"
            />
            <span className="no-of-reviews">
              ({product?.numOfReviews} Reviews)
            </span>
          </div>
          <div
            style={{
              width: "400px",
            }}
          >
            <BuyProduct product={product} />
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>

          <p>{product?.description}</p>
          <h3>Category :</h3>
          <p>{product?.subcategory}</p>

          <div className="features mt-5">
            <h3 className="mb-4">
              {product?.category === " Books" ? "Pages :" : "Chapters :"}
            </h3>

            <div className="Product-feature">
              <p>{product?.numOfPages} </p>
            </div>
          </div>
        </div>
      </div>

      <NewReview productId={product?._id} />
      <ListReviews reviews={product?.reviews} />
    </div>
  );
};

export default ProductDetails;
