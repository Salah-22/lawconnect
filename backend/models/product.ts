import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

enum BooksSubcategory {
  PublicLaw = "Public Law",
  PrivateLaw = "Private Law",
}

enum CoursesSubcategory {
  FirstGrade = "Public Law",
  SecondGrade = "Private Law",
}

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IFile extends Document {
  name: string;
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  numOfPages: number;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  files: IFile[];
  category: string;
  subcategory: BooksSubcategory | CoursesSubcategory;
  reviews: IReview[];
  user: IUser;
  createdAt: Date;
}

const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [200, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price per night"],
    default: 0.0,
  },

  numOfPages: {
    type: Number,
    required: [true, "Please enter product Pages Or Chapters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  files: [
    {
      name: {
        type: String,
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"],
      },
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: ["Books", "Course"],
      message: "Please select correct category for product",
    },
  },
  subcategory: {
    type: String,
    enum: {
      values: [
        ...Object.values(BooksSubcategory),
        ...Object.values(CoursesSubcategory),
      ],
      message: "Please select correct subcategory for product",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", productSchema);
