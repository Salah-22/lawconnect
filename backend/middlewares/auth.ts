import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/user";
import Products, { IProduct } from "../models/product";

export const isAuthenticatedUser = async (
  req: NextRequest,
  event: any,
  next: any
) => {
  const session = await getToken({ req });

  if (!session) {
    return NextResponse.json(
      {
        message: "Login first to access this route",
      },
      { status: 401 }
    );
  }

  req.user = session.user as IUser;

  return next();
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: NextRequest, event: any, next: any) => {
    // if (!roles.includes(req.user.role)) {
    //   return NextResponse.json(
    //     {
    //       errMessage: `Role (${req.user.role}) is not allowed to access this resource.`,
    //     },
    //     { status: 403 }
    //   );
    // }

    return next();
  };
};

export const updateProdectsMiddleware = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  next: any
) => {
  let product = await Products.findById(params.id);

  // Check if the authenticated user is the owner of the project
  if (!product || product.user.toString() !== req.user._id.toString()) {
    return NextResponse.json(
      {
        errMessage: "Unauthorized. You are not the owner of this project.",
      },
      { status: 401 }
    );
  }

  return next();
};
