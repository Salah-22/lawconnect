"use client";

import { IPurchases } from "@/backend/models/purchases";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    booking: IPurchases;
  };
}

const PurchaseDetails = ({ data }: Props) => {
  const booking = data?.booking;
  const { user } = useAppSelector((state) => state.auth);

  const isPaid = booking?.paymentInfo?.status === "paid" ? true : false;

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 booking-details">
          <div className="d-flex justify-content-between align-items-center my-5">
            <h2>Purchase # {booking?._id}</h2>
            <Link
              className="btn btn-success"
              href={`/purchases/invoice/${booking?._id}`}
            >
              <i className="fa fa-print"></i> Invoice
            </Link>
          </div>

          <h4 className="mt-5 mb-4">User Info</h4>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name:</th>
                <td>{booking?.user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{booking?.user?.email}</td>
              </tr>
              <tr>
                <th scope="row">Amount Paid:</th>
                <td>${booking?.amountPaid}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-4">Payment Info:</h4>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status:</th>
                <td>
                  <b className={isPaid ? "greenColor" : "redColor"}>
                    {isPaid ? "Paid" : "Not Paid"}
                  </b>
                </td>
              </tr>
              {user?.role === "admin" && (
                <tr>
                  <th scope="row">Stripe ID:</th>
                  <td>
                    <b className="redColor">{booking?.paymentInfo.id}</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h4 className="mt-5 mb-4">Purchased Product:</h4>

          <hr />

          {booking?.product ? (
            <div className="cart-item my-1">
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <Image
                    src={booking?.product?.images[0]?.url}
                    alt={booking?.product?.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link href={`/products/${booking?.product?._id}`}>
                    {booking?.product?.name}
                  </Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${booking?.product?.price}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-danger">Product no longer exist</div>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetails;
