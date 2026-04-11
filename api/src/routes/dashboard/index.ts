import { Router } from "express";
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
 * /dashboard/articles:
 *   get:
 *     tags: [Dashboard]
 *     summary: Dashboard articles list
 *     responses:
 *       200:
 *         description: Dashboard articles response
 */
router.get("/articles", (req, res) => {
  res.json({ message: "Dashboard Articles" });
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
 * /dashboard/create_article:
 *   post:
 *     tags: [Dashboard]
 *     summary: Create article
 *     responses:
 *       200:
 *         description: Created article response
 */
router.post("/create_article", (req, res) => {
  res.json({ message: "Created Article" });
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
  res.json({ message: "Published Article" });
});

export default router;