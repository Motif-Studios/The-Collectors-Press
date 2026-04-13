import { Router } from "express";
import { get } from "node:http";
import { createArticle, getDashboardArticles, saveArticle } from "../../../controllers/dashboard/controller";
const router = Router();

/**
 * @openapi
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Dashboard root
 *     responses:
 *       200:
 *         description: Dashboard response
 */
router.get("/", (req, res) => {
  res.json({ message: "Dashboard" });
});


/**
 * @openapi
 * /dashboard/articles/{user_id}:
 *   get:
 *     tags: [Dashboard]
 *     summary: Dashboard articles list
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard articles response
 */
router.get("/articles/:user_id", async (req, res) => {
   const { user_id } = req.params;
   const articles = await getDashboardArticles(user_id);
   res.json(articles);
});

/**
 * @openapi
 * /dashboard/articles/{status}:
 *   get:
 *     tags: [Dashboard]
 *     summary: Dashboard articles by status
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered dashboard articles
 */
router.get("/articles/:status", (req, res) => {
  res.json({ message: "Dashboard Articles by status" });
});

// router.get("/acticles/:article_id/edit", (req, res) => {
//   res.json({ message: "Dashboard" });
// });

/**
 * @openapi
 * /dashboard/preview_article:
 *   get:
 *     tags: [Dashboard]
 *     summary: Preview article
 *     responses:
 *       200:
 *         description: Article preview response
 */
router.get("/preview_article", (req, res) => {
  res.json({ message: "Dashboard Articles by Article ID" });
});

/**
 * @openapi
 * /dashboard/create_article/{user_id}:
 *   post:
 *     tags: [Dashboard]
 *     summary: Create article
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Created article response
 */
router.post("/create_article/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const articleId = await createArticle(user_id);
    res.json({ article_id: articleId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create article" });
  }
});

/**
 * @openapi
 * /dashboard/publish_article:
 *   post:
 *     tags: [Dashboard]
 *     summary: Publish article
 *     responses:
 *       200:
 *         description: Published article response
 */
router.post("/publish_article", (req, res) => {
  res.json({ message: "Published Article" });
});

/**
 * @openapi
 * /dashboard/delete_article:
 *   post:
 *     tags: [Dashboard]
 *     summary: Delete article
 *     responses:
 *       200:
 *         description: Deleted article response
 */
router.post("/delete_article", (req, res) => {
  res.json({ message: "Deleted Article" });
});


/**
 * @openapi
 * /dashboard/save_article:
 *   post:
 *     tags: [Dashboard]
 *     summary: Save article
 *     responses:
 *       200:
 *         description: Saved article response
 */
router.post("/save_article/:article_id", async (req, res) => {
  try{
    const { article_id } = req.params;
    const articleData = req.body?.content ?? req.body;

    const response = await saveArticle(article_id, articleData);
    res.json(response);
  }catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save article";
    res.status(500).json({ error: message });
  }
});

export default router;