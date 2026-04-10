import { Router } from "express";
import { getArticleByCategoryName, getAllArticles, getArticleById  } from "../../../controllers/articles/controller";

const router = Router();

router.get("/:article_id", async (req, res) => {
  const { article_id } = req.params;
  const data = await getArticleById(article_id);
  res.json(data); 
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

router.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.json(articles);
});

export default router;