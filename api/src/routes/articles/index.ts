import { Router } from "express";
const router = Router();

router.get("/:article_id", (req, res) => {
  res.json({ message: "Article by Id" });
});

export default router;