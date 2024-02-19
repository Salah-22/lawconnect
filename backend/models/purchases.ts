import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user";
import { IProduct } from "./product";

export interface IPurchases extends Document {
  product: IProduct;
  user: IUser;
  amountPaid: number;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;
  createdAt: Date;
}

const purchasesSchema: Schema<IPurchases> = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  amountPaid: {
    type: Number,
    required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Purchases ||
  mongoose.model<IPurchases>("Purchases", purchasesSchema);
