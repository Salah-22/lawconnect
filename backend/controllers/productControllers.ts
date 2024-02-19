import { NextRequest, NextResponse } from "next/server";
import Product, { IFile, IImage, IProduct } from "../models/product";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";
import { IReview } from "../models/product";
import Booking from "../models/purchases";
import { delete_file, upload_file } from "../utils/cloudinary";

// Get all product  =>  /api/product
export const allProducts = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const apiFilters = new APIFilters(Product, queryStr).search().filter();

  let products: IProduct[] = await apiFilters.query;
  const filteredProductsCount: number = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filteredProductsCount,
    resPerPage,
    products,
  });
});

// Create new product  =>  /api/user/products
export const newProduct = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  body.user = req.user._id;

  const product = await Product.create(body);

  return NextResponse.json({
    success: true,
    product,
  });
});

// Get product details  =>  /api/products/:id
export const getProductDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const product = await Product.findById(params.id).populate(
      "reviews.user user"
    );

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    return NextResponse.json({
      success: true,
      product,
    });
  }
);

// Update product details  =>  /api/user/products/:id
export const updateProduct = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let product = await Product.findById(params.id);
    const body = await req.json();

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    product = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  }
);

// Upload product images  =>  /api/user/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const product = await Product.findById(params.id);
    const body = await req.json();

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    const uploader = async (image: string) =>
      upload_file(image, "lawconnect/books");

    const urls = await Promise.all((body?.images).map(uploader));

    product?.images?.push(...urls);

    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });
  }
);

// Delete product image  =>  /api/user/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const product = await Product.findById(params.id);
    const body = await req.json();

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    const isDeleted = await delete_file(body?.imgId);

    if (isDeleted) {
      product.images = product?.images.filter(
        (img: IImage) => img.public_id !== body.imgId
      );
    }

    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });
  }
);

// Upload product Files => /api/user/products/:id/upload_images
export const uploadProductFiles = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const product = await Product.findById(params.id);
    const body = await req.json();

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    const uploader = async (file: string) => {
      const uploadedFile = await upload_file(file, "lawconnect/files");
      return { name: body.name, ...uploadedFile }; // Include name and other properties from uploadedFile
    };

    const urls = await Promise.all((body?.files).map(uploader));

    // Iterate over each URL and replace "http://" with "https://"
    const urlsHttps = urls.map((url) => {
      if (typeof url === "string") {
        return url.replace(/^http:/, "https:");
      } else {
        // If the URL is an object, preserve its structure but replace the URL
        return { ...url, url: url.url.replace(/^http:/, "https:") };
      }
    });

    // Push the HTTPS URLs to the product's files array
    product.files.push(...urlsHttps);

    // Save the product with the updated files URLs
    await product.save();

    // Respond with success and the updated product
    return NextResponse.json({
      success: true,
      product,
    });
  }
);

// Delete product file  =>  /api/user/products/:id/delete_image
export const deleteProductFile = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const product = await Product.findById(params.id);
    const body = await req.json();

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    const isDeleted = await delete_file(body?.imgId);

    if (isDeleted) {
      product.files = product?.files.filter(
        (img: IFile) => img.public_id !== body.imgId
      );
    }

    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });
  }
);

// Delete product details  =>  /api/user/products/:id
export const deleteProduct = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const product = await Product.findById(params.id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    // Delete images associated with the product
    for (let i = 0; i < product?.images?.length; i++) {
      await delete_file(product?.images[i].public_id);
    }

    // Delete files associated with the product
    for (let i = 0; i < product?.files?.length; i++) {
      await delete_file(product?.files[i].public_id);
    }

    await product.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);

// Create/Update product review  =>  /api/reviews
export const createProductReview = catchAsyncErrors(
  async (req: NextRequest) => {
    const body = await req.json();
    const { rating, comment, productId } = body;

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product?.reviews?.find(
      (r: IReview) => r.user?.toString() === req?.user?._id?.toString()
    );

    if (isReviewed) {
      product?.reviews?.forEach((review: IReview) => {
        if (review.user?.toString() === req?.user?._id?.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product?.reviews?.reduce(
        (acc: number, item: { rating: number }) => item.rating + acc,
        0
      ) / product?.reviews?.length;

    await product.save();

    return NextResponse.json({
      success: true,
    });
  }
);

// Can user review product  =>  /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const bookings = await Booking.find({
    user: req.user._id,
    product: productId,
  });

  const canReview = bookings?.length > 0 ? true : false;

  return NextResponse.json({
    canReview,
  });
});

// Get all products   =>  /api/user/product
export const allUserProducts = catchAsyncErrors(async (req: NextRequest) => {
  const userId = req?.user?._id;
  const products = await Product.find({ user: userId });

  return NextResponse.json({
    products,
  });
});

// Get product reviews   =>  /api/user/products/reviews
export const getProductReviews = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const product = await Product.findById(
    searchParams.get("productId")
  ).populate("reviews.user");

  return NextResponse.json({
    reviews: product.reviews,
  });
});

// Delete product review  =>  /api/user/products/reviews
export const deleteProductReview = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("productId");
    const reviewId = searchParams.get("id");

    const product = await Product.findById(productId);

    const reviews = product.reviews.filter(
      (review: IReview) => review?._id.toString() !== reviewId
    );
    const numOfReviews = reviews.length;

    const ratings =
      numOfReviews === 0
        ? 0
        : product?.reviews?.reduce(
            (acc: number, item: { rating: number }) => item.rating + acc,
            0
          ) / numOfReviews;

    await Product.findByIdAndUpdate(productId, {
      reviews,
      numOfReviews,
      ratings,
    });

    return NextResponse.json({
      success: true,
    });
  }
);
