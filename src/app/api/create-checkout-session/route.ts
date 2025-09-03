// app/api/create-checkout-session/route.ts
import Stripe from "stripe";
const stripeKey = process.env.STRIPE_SECRET_KEY;

export async function POST(req: Request) {
  if (!stripeKey) {
    console.error("Missing STRIPE_SECRET_KEY");
    return new Response(
      JSON.stringify({ error: "Stripe is not configured" }),
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

  const body = await req.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: body.items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  });

  return new Response(JSON.stringify({ id: session.id }), { status: 200 });
}
