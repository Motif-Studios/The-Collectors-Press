import { Router } from "express";
import { uploadFile } from "../../../controllers/upload/controller";

const router = Router();

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