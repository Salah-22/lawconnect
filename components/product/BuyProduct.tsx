"use client";

import { IProduct } from "@/backend/models/product";
import {
  useLazyStripeCheckoutQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import { useCanUserReviewQuery } from "@/redux/api/productApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

interface Props {
  product: IProduct;
}

const BuyProduct = ({ product }: Props) => {
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: { canReview } = {} } = useCanUserReviewQuery(product?._id);

  const [newBooking] = useNewBookingMutation();

  const [stripeCheckout, { error, isLoading, data: checkoutData }] =
    useLazyStripeCheckoutQuery();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (checkoutData) {
      router.replace(checkoutData?.url);
    }
  }, [error, checkoutData]);

  const buyProduct = () => {
    const amount = product.price;

    const checkoutData = {
      amount,
    };

    stripeCheckout({ id: product?._id, checkoutData });
  };

  // const bookRoom = () => {
  //   const bookingData = {
  //     room: room?._id,
  //     checkInDate,
  //     checkOutDate,
  //     daysOfStay,
  //     amountPaid: room.price * daysOfStay,
  //     paymentInfo: {
  //       id: "STRIPE_ID",
  //       status: "PAID",
  //     },
  //   };
  //   newBooking(bookingData);
  // };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>${product?.price}</b>
      </p>

      <hr />

      {!isAuthenticated && (
        <div className="alert alert-danger my-3">Login To Buy Product.</div>
      )}

      {isAuthenticated && !canReview && (
        <button
          className="btn py-3 form-btn w-100"
          onClick={buyProduct}
          disabled={isLoading}
        >
          Buy
        </button>
      )}

      {canReview && (
        <Link className="btn py-3 form-btn w-100" href="/bookings/me">
          <i aria-hidden className="fas fa-check"></i> My Purchases
        </Link>
      )}
    </div>
  );
};

export default BuyProduct;
