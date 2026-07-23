import { Router } from "express";
import {
  createArticle,
  getDashboardArticles,
  saveArticle,
  submitArticle,
  deleteArticle,
  publishArticle,
  rejectArticle,
  archiveArticle,
  setArticleStatus,
  getAdminQueuedArticles,
  getAdminPublishedArticles,
  getAdminAllArticles,
  approveArticle,
  assignArticleToPanel,
  removeArticleFromPanel,
  reorderArticleInPanel,
} from "../../../controllers/dashboard/controller";

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

router.post("/create_article/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const article = await createArticle(user_id);
    res.json({ article_id: article.article_id, slug: article.slug });
  } catch (error) {
    res.status(500).json({ error: "Failed to create article" });
  }
});

router.post("/save_article/:article_id", async (req, res) => {
  try {
    const { article_id } = req.params;
    const articleData = req.body?.content ?? req.body;
    const response = await saveArticle(article_id, articleData);
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save article";
    res.status(500).json({ error: message });
  }
});


router.put("/save_article/:article_id", async (req, res) => {
  try {
    const { article_id } = req.params;
    const articleData = req.body?.content ?? req.body;
    const response = await saveArticle(article_id, articleData);
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save article";
    res.status(500).json({ error: message });
  }
});

router.post("/submit_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await submitArticle(article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit article";
    res.status(500).json({ error: message });
  }
});

router.put("/submit_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await submitArticle(article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit article";
    res.status(500).json({ error: message });
  }
});

router.post("/delete_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await deleteArticle(article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete article";
    res.status(500).json({ error: message });
  }
});

router.post("/publish_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await publishArticle(article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish article";
    res.status(500).json({ error: message });
  }
});

router.post("/archive_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await archiveArticle(article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to archive article";
    res.status(500).json({ error: message });
  }
});

router.post("/reject_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  const rejectionReason = typeof req.body?.rejectionReason === "string" ? req.body.rejectionReason : "";

  try {
    const result = await rejectArticle(article_id, rejectionReason);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reject article";
    res.status(400).json({ error: message });
  }
});

router.patch("/admin/article/:article_id/status", async (req, res) => {
  const { article_id } = req.params;
  const status = typeof req.body?.status === "string" ? req.body.status : undefined;
  const rejectionReason = typeof req.body?.rejectionReason === "string" ? req.body.rejectionReason : undefined;

  if (!status) {
    return res.status(400).json({ error: "status is required" });
  }

  try {
    const result = await setArticleStatus(article_id, status as Parameters<typeof setArticleStatus>[1], rejectionReason);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update article status";
    res.status(400).json({ error: message });
  }
});

// ── Admin routes ──────────────────────────────────────────────────────────────

router.get("/admin/queued_articles", async (req, res) => {
  try {
    const articles = await getAdminQueuedArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch queued articles" });
  }
});

router.get("/admin/published_articles", async (req, res) => {
  try {
    const articles = await getAdminPublishedArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch published articles" });
  }
});

router.get("/admin/all_articles", async (req, res) => {
  try {
    const articles = await getAdminAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all articles" });
  }
});

router.post("/admin/approve_article/:article_id", async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await approveArticle(article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve article";
    res.status(500).json({ error: message });
  }
});

router.post("/admin/panel/:panel_name/:article_id", async (req, res) => {
  const { panel_name, article_id } = req.params;
  const position = req.query.position ? parseInt(req.query.position as string) : undefined;
  try {
    const result = await assignArticleToPanel(panel_name, article_id, position);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to assign article to panel";
    res.status(500).json({ error: message });
  }
});

router.delete("/admin/panel/:panel_name/:article_id", async (req, res) => {
  const { panel_name, article_id } = req.params;
  try {
    const result = await removeArticleFromPanel(panel_name, article_id);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove article from panel";
    res.status(500).json({ error: message });
  }
});

router.post("/admin/panel/:panel_name/:article_id/reorder", async (req, res) => {
  const { panel_name, article_id } = req.params;
  const { direction } = req.body ?? {};
  if (direction !== "up" && direction !== "down") {
    return res.status(400).json({ error: "direction must be 'up' or 'down'" });
  }
  try {
    const result = await reorderArticleInPanel(panel_name, article_id, direction);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to reorder article";
    res.status(500).json({ error: message });
  }
});

export default router;