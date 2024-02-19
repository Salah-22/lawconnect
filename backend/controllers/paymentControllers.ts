import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Product from "../models/product";
import User from "../models/user";
import { headers } from "next/headers";
import Purchase from "../models/purchases";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Genereate stripe checkout session  =>  /api/payment/checkout_session/:productId
export const stripeCheckoutSession = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { searchParams } = new URL(req.url);

    const productAmount = searchParams.get("amount");

    // Get product details
    const product = await Product.findById(params.id);

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.API_URL}/purchases/me`,
      cancel_url: `${process.env.API_URL}/products/${product?._id}`,
      customer_email: req.user.email,
      client_reference_id: params?.id,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(productAmount) * 100,
            product_data: {
              name: product?.name,
              description: product?.description,
              images: [`${product?.images[0]?.url}`],
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json(session);
  }
);

// Create new booking after payment  =>  /api/payment/webhook
export const webhookCheckout = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = headers().get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const product = session.client_reference_id;

      const user = (await User.findOne({ email: session?.customer_email })).id;

      const amountPaid = session?.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      await Purchase.create({
        product,
        user,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      return NextResponse.json({ success: true });
    }
  } catch (error: any) {
    console.log("Eror in stripe checkout webhook => ", error);
    return NextResponse.json({ errMessage: error?.message });
  }
};
