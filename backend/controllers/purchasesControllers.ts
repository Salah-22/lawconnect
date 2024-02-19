import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Purchases, { IPurchases } from "../models/purchases";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";
import Product from "../models/product";

const moment = extendMoment(Moment);

// Create new Purchase   =>  /api/purchases
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const { product, amountPaid, paymentInfo } = body;

  const booking = await Purchases.create({
    product,
    user: req.user._id,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  return NextResponse.json({
    booking,
  });
});

// Get current user purchases   =>  /api/purchases/me
export const myBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Purchases.find({ user: req.user._id }).populate(
    "user product"
  );

  return NextResponse.json({
    bookings,
  });
});

// Get purchase details   =>  /api/purchases/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Purchases.findById(params.id).populate(
      "user product"
    );

    if (
      booking.user?._id?.toString() !== req.user._id &&
      req?.user?.role !== "user"
    ) {
      throw new ErrorHandler("You can not view this purchase", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);

const getTopPerformingProducts = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  // Find products belonging to the current user
  const userProducts = await Product.find({ user: userId }).select("_id");

  // Extract product IDs from userProducts
  const productIds = userProducts.map((product) => product._id);

  const topProducts = await Purchases.aggregate([
    // Stage 1: Filter documents within start and end date and belonging to the current user's products
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        product: { $in: productIds },
      },
    },
    // Stage 2: Group documents by product
    {
      $group: {
        _id: "$product",
        bookingsCount: { $sum: 1 },
      },
    },
    // Stage 3: Sort documents by bookingsCount in descending order
    {
      $sort: { bookingsCount: -1 },
    },
    // Stage 4: Limit the documents
    {
      $limit: 3,
    },
    // Stage 5: Retrieve additional data from products collection like product name
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productData",
      },
    },
    // Stage 6: Takes productData and deconstructs into documents
    {
      $unwind: "$productData",
    },
    // Stage 7: Shape the output document (include or exclude the fields)
    {
      $project: {
        _id: 0,
        productName: "$productData.name",
        bookingsCount: 1,
      },
    },
  ]);

  return topProducts;
};

// Get sales stats   =>  /api/user/sales_stats
export const getSalesStats = catchAsyncErrors(async (req: NextRequest) => {
  const userId = req?.user?._id;

  // Find products belonging to the current user
  const userProducts = await Product.find({ user: userId }).select("_id");

  // Extract product IDs from userProducts
  const productIds = userProducts.map((product) => product._id);

  // Find bookings where the product is in productIds
  const bookings = await Purchases.find({ product: { $in: productIds } });

  const startDate = new Date(); // Assuming start date is today
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(); // Assuming end date is today
  endDate.setHours(23, 59, 59, 999);

  // Filter bookings based on date range
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return bookingDate >= startDate && bookingDate <= endDate;
  });

  const numberOfBookings = filteredBookings.length;
  const totalSales = filteredBookings.reduce(
    (acc, booking) => acc + booking.amountPaid,
    0
  );

  const topProducts = await getTopPerformingProducts(
    userId,
    startDate,
    endDate
  );

  return NextResponse.json({
    numberOfBookings,
    totalSales,
    topProducts,
  });
});

// Get user sales   =>  /api/user/sales
export const allUserSales = catchAsyncErrors(async (req: NextRequest) => {
  const userId = req?.user?._id;

  // Find products belonging to the current user
  const userProducts = await Product.find({ user: userId }).select("_id");

  // Extract product IDs from userProducts
  const productIds = userProducts.map((product) => product._id);

  // Find bookings where the product is in productIds
  const bookings = await Purchases.find({
    product: { $in: productIds },
  }).populate("product user");

  return NextResponse.json({
    bookings,
  });
});

// Delete Sales   =>  /api/user/sales/:id
export const deleteSales = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Purchases.findById(params.id);

    if (!booking) {
      throw new ErrorHandler("sale not found with this ID", 404);
    }

    await booking?.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
