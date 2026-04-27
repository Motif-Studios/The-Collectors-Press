import { Router } from "express";
import multer from "multer";
import { uploadFile, saveImage } from "../../../controllers/upload/controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /upload:
 *   post:
 *     tags: [Upload]
 *     summary: Upload a file payload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload result
 *       500:
 *         description: Upload error
 */
router.post("/:article_id", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const article_id = req.params.article_id.toString();
    if (!article_id) {
      return res.status(400).json({ error: "No article ID provided" });
    }

    const result = await uploadFile(req.file, article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: message });
  }
});

/**
 * @openapi
 * /upload/save-image/{article_id}:
 *   post:
 *     tags: [Save Cover Image to Article]
 *     summary: Save uploaded image path to article record
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the article to associate the image with
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *             required:
 *               - path
 *     responses:
 *       200:
 *         description: Upload result
 *       500:
 *         description: Upload error
 */
router.post("/save-image/:article_id", async (req, res) => {
  try {
    const { path } = req.body;
    const { article_id } = req.params;
    if (!path) {
      return res.status(400).json({ error: "No image path provided" });
    }

    const result = await saveImage(path, article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: message });
  }
});

export default router;