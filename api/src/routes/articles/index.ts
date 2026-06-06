import { Router } from "express";
import { getArticleByCategoryName, getAllArticles, getArticleById, getArticleBySlug, getSavedArticles, getHomePageData, saveArticleToUser, isArticleSaved } from "../../../controllers/articles/controller";

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
 * /articles/save:
 *   post:
 *     tags: [Articles]
 *     summary: Save an article for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               article_id:
 *                 type: string
 *             required:
 *               - user_id
 *               - article_id
 *     responses:
 *       200:
 *         description: Article saved
 *       400:
 *         description: Missing user_id or article_id
 *       500:
 *         description: Failed to save article
 */
router.post("/save", async (req, res) => {
  const { user_id, article_id } = req.body ?? {};

  if (!user_id || typeof user_id !== "string" || !article_id || typeof article_id !== "string") {
    return res.status(400).json({ message: "user_id and article_id are required" });
  }

  const result = await saveArticleToUser(user_id, article_id);

  if (result && typeof result === "object" && "success" in result) {
    return res.json(result);
  }

  return res.status(500).json({ message: "Failed to save article" });
});

/**
 * @openapi
 * /articles/home-data:
 *   get:
 *     tags: [Articles]
 *     summary: Get home page data
 *     responses:
 *       200:
 *         description: Home page data
 */
router.get("/home-data", async (req, res) => {
  const homeData = await getHomePageData();
  res.json(homeData);
});

/**
 * @openapi
 * /articles/slug/{article_slug}:
 *   get:
 *     tags: [Articles]
 *     summary: Get article by slug
 *     parameters:
 *       - in: path
 *         name: article_slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article data
 */
router.get("/slug/:article_slug", async (req, res) => {
  const { article_slug } = req.params;
  const data = await getArticleBySlug(article_slug);
  res.json(data);
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

/**
 * GET /articles/is-saved
 * query: user_id, article_id
 */
router.get("/is-saved", async (req, res) => {
  const { user_id, article_id } = req.query;
  if (!user_id || typeof user_id !== "string" || !article_id || typeof article_id !== "string") {
    return res.status(400).json({ message: "user_id and article_id query parameters are required" });
  }

  const saved = await isArticleSaved(user_id as string, article_id as string);
  res.json({ saved });
});

export default router;