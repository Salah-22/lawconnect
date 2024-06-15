"use client";

import React from "react";
import Search from "../Search";
import { IProduct } from "@/backend/models/product";
import { useSearchParams } from "next/navigation";
import ProductItem from "./ProductItem";
import CustomPagination from "../layout/CustomPagination";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredProductsCount: number;
    products: IProduct[];
  };
}

const AllProducts = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const category = searchParams.get("category");

  const { products, resPerPage, filteredProductsCount } = data;
  return (
    <section className="min-h-screen w-full p-10 flex flex-col items-center">
      <Search />
      {name || category
        ? `${filteredProductsCount} Projects found`
        : "All Projects"}
      <div className="row mt-">
        {products?.length === 0 ? (
          <div className="alert alert-danger mt-5 w-100">
            <b>No Products.</b>
          </div>
        ) : (
          products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>

      <CustomPagination
        resPerPage={resPerPage}
        filteredProductsCount={filteredProductsCount}
      />
    </section>
  );
};

export default AllProducts;
