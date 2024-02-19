"use client";

import { IPurchases } from "@/backend/models/purchases";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    bookings: IPurchases[];
  };
}

const MyPurchases = ({ data }: Props) => {
  const bookings = data?.bookings;

  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Name",
          field: "product",
          sort: "asc",
        },

        {
          label: "Amount Paid",
          field: "amountpaid",
          sort: "asc",
        },
        {
          label: "View Product",
          field: "view",
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

    bookings?.forEach((booking) => {
      data?.rows?.push({
        product: booking?.product?.name,
        amountpaid: `$${booking?.amountPaid}`,
        view: (
          <Link
            href={`/purchases/product/${booking._id}`}
            className="btn btn-primary"
          >
            <i className="fa fa-eye"></i>
          </Link>
        ),

        actions: (
          <>
            <Link
              href={`/purchases/${booking._id}`}
              className="btn btn-primary"
            >
              {" "}
              <i className="fa fa-eye"></i>{" "}
            </Link>
            <Link
              href={`/purchases/invoice/${booking._id}`}
              className="btn btn-success ms-2"
            >
              {" "}
              <i className="fa fa-receipt"></i>{" "}
            </Link>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <div className="container">
      <h1 className="my-5">My Purchases</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyPurchases;
