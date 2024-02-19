import dbConnect from "@/backend/config/dbConnect";
import { deleteSales } from "@/backend/controllers/purchasesControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
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

router.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteSales);

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
