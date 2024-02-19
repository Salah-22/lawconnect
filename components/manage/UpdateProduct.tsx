"use client";

import { useUpdateProductMutation } from "@/redux/api/productApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import { IProduct } from "@/backend/models/product";
import { revalidateTag } from "@/helpers/revalidate";

interface Props {
  data: {
    product: IProduct;
  };
}

const UpdateProduct = ({ data }: Props) => {
  const product = data?.product;

  const [productDetails, setProductDetails] = useState({
    name: product?.name,
    price: product?.price,
    description: product?.description,
    category: product?.category,
    subcategory: product?.subcategory,
    numOfPages: product?.numOfPages,
  });

  const { name, price, description, category, subcategory, numOfPages } =
    productDetails;

  const router = useRouter();

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("ProductDetails");
      router.refresh();
      toast.success("Product Updated");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      name,
      price: price,
      description,
      category,
      subcategory,
      numOfPages: Number(numOfPages),
    };

    updateProduct({ id: product._id, body: productData });
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  const renderSubcategoryOptions = () => {
    switch (category) {
      case "Books":
        return (
          <>
            <option value="Public Law">Public Law</option>
            <option value="Private Law">Private Law</option>
          </>
        );
      case "Course":
        return (
          <>
            <option value="Public Law">Public Law</option>
            <option value="Private Law">Private Law</option>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h2 className="mb-4">
            Update {category === "Books" ? "Book" : "Course"}
          </h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price_field" className="form-label">
              Price
            </label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              name="price"
              value={price}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description_field" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description_field"
              rows={8}
              name="description"
              value={description}
              onChange={onChange}
              required
            ></textarea>
          </div>

          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="roduct_type_field" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="product_type_field"
                name="category"
                value={category}
                onChange={onChange}
              >
                {["Books", "Course"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 col">
              <label htmlFor="subcategory_field" className="form-label">
                Subcategory
              </label>
              <select
                className="form-select"
                id="subcategory_field"
                name="subcategory"
                value={subcategory}
                onChange={onChange}
              >
                {renderSubcategoryOptions()}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="guest_field" className="form-label">
              Number Of {category === "Books" ? "Pages" : "Chapters"}
            </label>
            <input
              className="form-control"
              id="guest_field"
              name="numOfPages"
              value={numOfPages}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
