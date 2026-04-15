import { Router } from "express";
import { makeCustomerSubscriber } from "../../../controllers/subscription/controller";

const router = Router();
const stripe = require("stripe")(process.env.sk_test);

/**
 * @openapi
 * /subscription:
 *   get:
 *     tags: [Subscription]
 *     summary: Subscription root
 *     responses:
 *       200:
 *         description: Subscriptions response
 */
router.get("/", (req, res) => {
  res.json({ message: "Subscriptions" });
});

/**
 * @openapi
 * /subscription/learn:
 *   get:
 *     tags: [Subscription]
 *     summary: Learn about subscriptions
 *     responses:
 *       200:
 *         description: Learn response
 */
router.get("/learn", (req, res) => {
  res.json({ message: "Learn about subscription" });
});

/**
 * @openapi
 * /subscription/payment/monthly:
 *   post:
 *     tags: [Subscription]
 *     summary: Subscription payment
 *     responses:
 *       200:
 *         description: Payment response
 */
router.post("/payment/monthly", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1TM6yzAcAGiNxdHjxrlslPCK",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/subscribe/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/subscribe/cancel",
  });
  res.json({ url: session.url });
});

/**
 * @openapi
 * /subscription/payment/yearly:
 *   post:
 *     tags: [Subscription]
 *     summary: Subscription payment
 *     responses:
 *       200:
 *         description: Payment response
 */
router.post("/payment/yearly", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1TM6yzAcAGiNxdHjxrlslPCK",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/subscribe/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/subscribe/cancel",
  });
  res.json({ url: session.url });
});

router.post("/payment/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try{
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return res.status(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Subscription successful for session:", session.id)
    const customerId = session.customer;
    const subscriptionId = session.subscription;
    const response = await makeCustomerSubscriber(customerId, subscriptionId);
    console.log("Customer subscription status updated:", response);
  }
  res.json({ received: true });
});


export default router;