import { Router } from "express";
import { getArticleByCategoryName } from "../../../controllers/articles/controller";

const router = Router();

router.get("/:article_id", (req, res) => {
  res.json({ message: "Article by Id" });
});

router.get("/category/:category_name", async (req, res) => {
  const { category_name } = req.params;
  const articles = await getArticleByCategoryName(category_name);
  res.json(articles);
});

router.get("/category/:category_name/:limit/:offset", async (req, res) => {
  const { category_name, limit, offset } = req.params;
  const articles = await getArticleByCategoryName(category_name, parseInt(limit), parseInt(offset));
  res.json(articles);
});

export default router;