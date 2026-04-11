import { Router } from "express";
import { getArticleByCategoryName, getAllArticles, getArticleById, getSavedArticles } from "../../../controllers/articles/controller";

const router = Router();

/**
 * @openapi
 * /articles/category/{category_name}:
 *   get:
 *     tags: [Articles]
 *     summary: Get articles by category
 *     parameters:
 *       - in: path
 *         name: category_name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of articles
 */
router.get("/category/:category_name", async (req, res) => {
  const { category_name } = req.params;
  const articles = await getArticleByCategoryName(category_name);
  res.json(articles);
});

/**
 * @openapi
 * /articles/category/{category_name}/{limit}/{offset}:
 *   get:
 *     tags: [Articles]
 *     summary: Get paginated articles by category
 *     parameters:
 *       - in: path
 *         name: category_name
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: offset
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of articles
 */
router.get("/category/:category_name/:limit/:offset", async (req, res) => {
  const { category_name, limit, offset } = req.params;
  const articles = await getArticleByCategoryName(category_name, parseInt(limit), parseInt(offset));
  res.json(articles);
});

/**
 * @openapi
 * /articles:
 *   get:
 *     tags: [Articles]
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: List of all articles
 */
router.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.json(articles);
});

/**
 * @openapi
 * /articles/saved:
 *   get:
 *     tags: [Articles]
 *     summary: Get saved articles for a user
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Saved articles list
 *       400:
 *         description: Missing user_id parameter
 */
router.get("/saved", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id || typeof user_id !== "string") {
    return res.status(400).json({ message: "user_id query parameter is required" });
  }
  const articles = await getSavedArticles(user_id as string);
  res.json(articles);
});

/**
 * @openapi
 * /articles/{article_id}:
 *   get:
 *     tags: [Articles]
 *     summary: Get article by ID
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article data
 */
router.get("/:article_id", async (req, res) => {
  const { article_id } = req.params;
  const data = await getArticleById(article_id);
  res.json(data); 
});

export default router;