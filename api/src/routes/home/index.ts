import { Router } from "express";
const router = Router();

/**
 * @openapi
 * /home:
 *   get:
 *     tags: [Home]
 *     summary: Home endpoint
 *     responses:
 *       200:
 *         description: Home response
 */
router.get("/", (req, res) => {
  res.json({ message: "Home" });
});

export default router;