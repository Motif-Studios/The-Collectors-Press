import { Router } from "express";
import { assignArticleToPanel, approveArticle, createArticle, deleteArticle, getAdminPublishedArticles, getAdminQueuedArticles, getArticlesByStatus, getDashboardArticles, publishArticle, removeArticleFromPanel, saveArticle } from "../../../controllers/dashboard/controller";
const router = Router();

type AdminPanelName =
  | "primary_feature"
  | "primary_stories"
  | "secondary_top_stories"
  | "secondary_stories"
  | "secondary_mini_cards";

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
router.get("/articles/:status/:user_id", async (req, res) => {
  const { status, user_id } = req.params;
  const articles = await getArticlesByStatus(user_id, status);
  res.json(articles);
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
 * /dashboard/publish_article/{article_id}:
 *   post:
 *     tags: [Dashboard]
 *     summary: Publish article
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Published article response
 */
router.post("/publish_article/:article_id", async (req, res) => {
  const article = req.params.article_id;
  try {
    const response = await publishArticle(article);
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish article";
    res.status(500).json({ error: message });
  }
});

/**
 * @openapi
 * /dashboard/delete_article/{article_id}:
 *   post:
 *     tags: [Dashboard]
 *     summary: Delete article
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted article response
 */
router.post("/delete_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    await deleteArticle(article_id);
    res.json({ message: `Deleted Article with ID: ${article_id}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete article";
    res.status(500).json({ error: message });
  }
});


/**
 * @openapi
 * /dashboard/save_article:
 *   put:
 *     tags: [Dashboard]
 *     summary: Save article
 *     responses:
 *       200:
 *         description: Saved article response
 */
router.put("/save_article/:article_id", async (req, res) => {
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

/**
 * @openapi
 * /dashboard/admin/queued_articles:
 *   get:
 *     tags: [Dashboard]
 *     summary: Admin queued articles
 *     responses:
 *       200:
 *         description: Articles awaiting approval
 */
router.get("/admin/queued_articles", async (_req, res) => {
  try {
    const articles = await getAdminQueuedArticles();
    res.json(articles);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load admin queue";
    res.status(500).json({ error: message });
  }
});

/**
 * @openapi
 * /dashboard/admin/published_articles:
 *   get:
 *     tags: [Dashboard]
 *     summary: Admin published articles
 *     responses:
 *       200:
 *         description: Published articles available for homepage panels
 */
router.get("/admin/published_articles", async (_req, res) => {
  try {
    const articles = await getAdminPublishedArticles();
    res.json(articles);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load published articles";
    res.status(500).json({ error: message });
  }
});

/**
 * @openapi
 * /dashboard/admin/approve_article/{article_id}:
 *   post:
 *     tags: [Dashboard]
 *     summary: Approve article
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Approved article response
 */
router.post("/admin/approve_article/:article_id", async (req, res) => {
  try {
    const { article_id } = req.params;
    const response = await approveArticle(article_id);
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve article";
    res.status(500).json({ error: message });
  }
});

/**
 * @openapi
 * /dashboard/admin/panel/{panel_name}/{article_id}:
 *   post:
 *     tags: [Dashboard]
 *     summary: Assign article to a homepage panel
 *     parameters:
 *       - in: path
 *         name: panel_name
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Panel assignment response
 */
router.post("/admin/panel/:panel_name/:article_id", async (req, res) => {
  try {
    const { panel_name, article_id } = req.params;
    const response = await assignArticleToPanel(panel_name as AdminPanelName, article_id);
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to assign article to panel";
    res.status(500).json({ error: message });
  }
});

/**
 * @openapi
 * /dashboard/admin/panel/{panel_name}/{article_id}:
 *   delete:
 *     tags: [Dashboard]
 *     summary: Remove article from a homepage panel
 *     parameters:
 *       - in: path
 *         name: panel_name
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Panel removal response
 */
router.delete("/admin/panel/:panel_name/:article_id", async (req, res) => {
  try {
    const { panel_name, article_id } = req.params;
    const response = await removeArticleFromPanel(panel_name as AdminPanelName, article_id);
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove article from panel";
    res.status(500).json({ error: message });
  }
});

export default router;
