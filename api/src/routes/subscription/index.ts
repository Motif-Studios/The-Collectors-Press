import { Router } from "express";
const router = Router();

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
 * /subscription/payment:
 *   post:
 *     tags: [Subscription]
 *     summary: Subscription payment
 *     responses:
 *       200:
 *         description: Payment response
 */
router.post("/payment", (req, res) => {
  res.json({ message: "Subscription Payment" });
});


export default router;