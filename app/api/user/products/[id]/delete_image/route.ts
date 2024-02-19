import dbConnect from "@/backend/config/dbConnect";
import { deleteProductImage } from "@/backend/controllers/productControllers";
import {
  isAuthenticatedUser,
  updateProdectsMiddleware,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router
  .use(isAuthenticatedUser, updateProdectsMiddleware)
  .put(deleteProductImage);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
