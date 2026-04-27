import { Router } from "express";
import { createNewSubscriber, createStripeCustomer, handleSubscriptionCancellation, handleSubscriptionPaymentFailed, handleSubscriptionRenewal, makeCustomerSubscriber } from "../../../controllers/subscription/controller";
import { supabase } from "../../../lib/supabase";

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
 * /subscription/create_customer:
 *   post:
 *     tags: [Subscription]
 *     summary: Create Customer in Stripe and Subscriber in DB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created article response
 */
router.post("/create_customer", async (req, res) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email
      : typeof req.query?.email === "string"
        ? req.query.email
        : undefined;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "'email' is required in request body" });
  }

  try{
    const customer = await createStripeCustomer(email);
    res.json({ id: customer.id });
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    res.status(500).json({ error: "Failed to create Stripe customer" });
  }
});

/**
 * @openapi
 * /subscription/make_new_subscriber:
 *   post:
 *     tags: [Subscription]
 *     summary: Create Customer in Stripe and Subscriber in DB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, email, customerId]
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *               customerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created article response
 */
router.post("/make_new_subscriber", async (req, res) => {
  const userId =
    typeof req.body?.userId === "string"
      ? req.body.userId
      : typeof req.query?.userId === "string"
        ? req.query.userId
        : undefined;
  const email =
    typeof req.body?.email === "string"
      ? req.body.email
      : typeof req.query?.email === "string"
        ? req.query.email
        : undefined;
  const customerId =
    typeof req.body?.customerId === "string"
      ? req.body.customerId
      : typeof req.query?.customerId === "string"
        ? req.query.customerId
        : undefined;

  if (!userId || !email || !customerId) {
    return res.status(400).json({ error: "'userId', 'email', and 'customerId' are required in request body" });
  }

  const response = await createNewSubscriber(userId, email, customerId);
  res.json(response);
});


/**
 * @openapi
 * /subscription/payment/monthly:
 *   get:
 *     tags: [Subscription]
 *     summary: Subscription payment
 *     responses:
 *       200:
 *         description: Payment response
 */
router.get("/payment/monthly", async (req, res) => {
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
    cancel_url: "http://localhost:3000/subscribe/",
  });
  res.json({ url: session.url });
});

/**
 * @openapi
 * /subscription/payment/yearly:
 *   get:
 *     tags: [Subscription]
 *     summary: Subscription payment
 *     responses:
 *       200:
 *         description: Payment response
 */
router.get("/payment/yearly", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1TO7byAcAGiNxdHjuGRy97ld",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/subscribe/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/subscribe/",
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
    return res.status(400).send('Invalid signature');
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Subscription successful for session:", session.id)
    const customerId = session.customer;
    const subscriptionId = session.subscription;
    const priceId = session.display_items[0].price.id;
    const response = await makeCustomerSubscriber(customerId, subscriptionId, priceId);
    console.log("Customer subscription status updated:", response);
  }

  if(event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    
    const response = await handleSubscriptionCancellation(subscription.id);
    console.log("Customer subscription cancelled:", response);
  }

  // renewal check event
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;

    const response = await handleSubscriptionRenewal(invoice.subscription);
    console.log("Customer subscription renewed:", response);
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object;

    const subscriptionId = invoice.subscription;

    const response = await handleSubscriptionPaymentFailed(subscriptionId);
    console.log("Customer subscription payment failed:", response);
  }

  res.json({ received: true });
});

export default router;