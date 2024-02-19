"use client";

import { IProduct } from "@/backend/models/product";
import { useDeleteProductMutation } from "@/redux/api/productApi";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
  data: {
    products: IProduct[];
  };
}

const AllProducts = ({ data }: Props) => {
  const products = data?.products;
  const router = useRouter();

  const [deleteProduct, { error, isSuccess }] = useDeleteProductMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("Product deleted");
    }
  }, [error, isSuccess]);

  const setProducts = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Product Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
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

    products?.forEach((product) => {
      data?.rows?.push({
        category: product.category,
        name: product.name,
        actions: (
          <>
            <Link
              href={`/user/products/${product._id}`}
              className="btn btn-outline-primary"
            >
              {" "}
              <i aria-hidden className="fa fa-pencil"></i>{" "}
            </Link>
            <Link
              href={`/user/products/${product._id}/upload_files`}
              className="btn btn-outline-success ms-2"
            >
              {" "}
              <i aria-hidden className="fa fa-file"></i>{" "}
            </Link>
            <Link
              href={`/user/products/${product._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              {" "}
              <i aria-hidden className="fa fa-images"></i>{" "}
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              {" "}
              <i aria-hidden className="fa fa-trash"></i>{" "}
            </button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div>
      <h1 className="my-5 position-relative">
        {`${products?.length} Products`}
        <Link
          href="/user/products/new"
          className="mt-0 btn text-white position-absolute end-0 form-btn"
        >
          Post Product
        </Link>
      </h1>

      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default AllProducts;
