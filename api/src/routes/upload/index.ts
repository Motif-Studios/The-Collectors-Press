import { Router } from "express";
import { uploadFile } from "../../../controllers/upload/controller";

const router = Router();

/**
 * @openapi
 * /upload:
 *   post:
 *     tags: [Upload]
 *     summary: Upload a file payload
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Upload result
 *       500:
 *         description: Upload error
 */
router.post("/", async (req, res) => {
  try {
    const result = await uploadFile(req.body);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: message });
  }
});


export default router;