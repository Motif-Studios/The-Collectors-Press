import { Router } from "express";
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
router.get("/", (req, res) => {
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
router.get("/subscription", (req, res) => {
    res.json({ message: "Account Subscription" })
})

/**
 * @openapi
 * /account/subscription/cancel:
 *   post:
 *     tags: [Account]
 *     summary: Cancel account subscription
 *     responses:
 *       200:
 *         description: Cancellation result
 */
router.post("/subscription/cancel", (req, res) => {
    res.json({ message: "Account Subscription Cancel" })
})

/**
 * @openapi
 * /account/subscription/renew:
 *   post:
 *     tags: [Account]
 *     summary: Renew account subscription
 *     responses:
 *       200:
 *         description: Renewal result
 */
router.post("/subscription/renew", (req, res) => {
    res.json({ message: "Account Subscription Renew" })
})

// router.get("/saved_stories", (req, res) => {
//     res.json({ message: "Account Saved Stories" })
// })

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
router.get("/help", (req, res) => {
    res.json({ message: "Account Help" })
})


export default router;