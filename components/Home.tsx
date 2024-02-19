"use client";

import React from "react";
import ProductItem from "./product/ProductItem";
import { IProduct } from "@/backend/models/product";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "next/navigation";
import Search from "./Search";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredProductsCount: number;
    products: IProduct[];
  };
}
const Home = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const category = searchParams.get("category");

  const { products, resPerPage, filteredProductsCount } = data;
  return (
    <div>
      <section id="products" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">All Products</h2>
        <Search />
        {name || category
          ? `${filteredProductsCount} Projects found`
          : "All Projects"}
        <div className="row mt-4">
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
      </section>

      <CustomPagination
        resPerPage={resPerPage}
        filteredProductsCount={filteredProductsCount}
      />
    </div>
  );
};

export default Home;
