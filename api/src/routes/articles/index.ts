import { Router } from "express";
import { getArticleByCategoryName, getAllArticles, getArticleById, getSavedArticles } from "../../../controllers/articles/controller";

const router = Router();

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

router.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.json(articles);
});

router.get("/saved", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id || typeof user_id !== "string") {
    return res.status(400).json({ message: "user_id query parameter is required" });
  }
  const articles = await getSavedArticles(user_id as string);
  res.json(articles);
});

router.get("/:article_id", async (req, res) => {
  const { article_id } = req.params;
  const data = await getArticleById(article_id);
  res.json(data); 
});

export default router;