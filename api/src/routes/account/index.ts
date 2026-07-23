import { Router } from "express";
import { cancelAccountSubscription, isSubscribed } from "../../../controllers/account/controller";

const router = Router();

/**
 * @openapi
 * /account:
 *   get:
 *     tags: [Account]
 *     summary: Account root
 *     responses:
 *       200:
 *         description: Account response
 */
router.get("/", (_req, res) => {
  res.json({ message: "Account" });
});

/**
 * @openapi
 * /account/subscription:
 *   get:
 *     tags: [Account]
 *     summary: Account subscription details
 *     responses:
 *       200:
 *         description: Subscription details
 */
router.get("/subscription", (_req, res) => {
  res.json({ message: "Account Subscription" });
});

/**
 * @openapi
 * /account/subscription/cancel/{user_id}:
 *   post:
 *     tags: [Account]
 *     summary: Cancel account subscription
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cancellation result
 */
router.post("/subscription/cancel/:user_id", async (req, res) => {
  const userId = req.params.user_id;

  if (!userId) {
    return res.status(400).json({ error: "'user_id' is required" });
  }

  try {
    const subscription = await cancelAccountSubscription(userId);
    return res.json({ message: "Account Subscription Cancelled", subscription });
  } catch {
    return res.status(500).json({ error: "Failed to cancel subscription" });
  }
});

/**
 * @openapi
 * /account/subscription/renew/{user_id}:
 *   post:
 *     tags: [Account]
 *     summary: Renew account subscription
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Renewal result
 */
router.post("/subscription/renew/:user_id", (_req, res) => {
  return res.json({ message: "Account Subscription Renewed" });
});

/**
 * @openapi
 * /account/is_subscriber:
 *   post:
 *     tags: [Account]
 *     summary: Check if user is a subscriber
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user to check
 *     responses:
 *       200:
 *         description: Subscription status
 */
router.post("/is_subscriber", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "'user_id' is required" });
  }

  try {
    const isSubscriber = await isSubscribed(user_id);

    if (isSubscriber) {
      return res.json({
        is_subscriber: true,
        account_message:
          "Thanks for subscribing! You have full access to subscriber-only content and can update your mailing preferences.",
        can_change_mailing_address: true,
      });
    }

    return res.json({
      is_subscriber: false,
      account_message:
        "You're currently not subscribed. To subscribe and receive printed issues, please visit /subscribe or contact support.",
      can_change_mailing_address: false,
    });
  } catch {
    return res.status(500).json({ error: "Failed to check subscription status" });
  }
});

/**
 * @openapi
 * /account/help:
 *   get:
 *     tags: [Account]
 *     summary: Account help
 *     responses:
 *       200:
 *         description: Help response
 */
router.get("/help", (_req, res) => {
  res.json({ message: "Account Help" });
});

/**
 * @openapi
 * /account/is_subscribed:
 *   get:
 *     tags: [Account]
 *     summary: Check if user is a subscriber (GET)
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to check
 *     responses:
 *       200:
 *         description: Subscription status
 */
router.get("/is_subscribed", async (req, res) => {
  const userId = req.query.user_id as string;

  if (!userId) {
    return res.status(400).json({ error: "'user_id' query parameter is required" });
  }

  try {
    const isSubscribedStatus = !!(await isSubscribed(userId));
    return res.json({ is_subscribed: isSubscribedStatus });
  } catch {
    return res.status(500).json({ error: "Failed to check subscription status" });
  }
});

export default router;
