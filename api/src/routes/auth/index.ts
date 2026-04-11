import { Router } from "express";


const router = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     responses:
 *       200:
 *         description: Signup response
 */
router.post("/signup", (req, res) => {
    res.json({ message: "temp signup" })
})

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     responses:
 *       200:
 *         description: Login response
 */
router.post("/login", (req, res) => {
    res.json({ message: "temp login" })
})

export default router;
