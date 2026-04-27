import { Router } from "express";
import { cancelAccountSubscription } from "../../../controllers/account/controller";

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
    } catch (error: unknown) {
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
router.post("/subscription/renew/:user_id", async (req, res) => {
    return res.json({ message: "Account Subscription Renewed" })
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