import { Router } from "express";
import { handleSearchQuery, handleSearchCategories, handleSearchCategoryAndQuery, handleSearchCategory } from "../../../controllers/search/controller";

const router = Router();

/**
 * @openapi
 * /search/category/{name}/{query}:
 *   get:
 *     tags: [Search]
 *     summary: Search in category with query
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/category/:name/:query", (req, res) => {
  const { name, query } = req.params;
  const data = handleSearchCategoryAndQuery(name, query);
  res.json(data);
});

/**
 * @openapi
 * /search/category/{name}:
 *   get:
 *     tags: [Search]
 *     summary: Search by category
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category search results
 */
router.get("/category/:name", async (req, res) => {
  const { name } = req.params;
  const data = await handleSearchCategory(name);
  res.json(data);
});

/**
 * @openapi
 * /search/category:
 *   get:
 *     tags: [Search]
 *     summary: Get searchable categories
 *     responses:
 *       200:
 *         description: Search categories
 */
router.get("/category", async (req, res) => {
  const data = await handleSearchCategories();
  res.json(data);
});

/**
 * @openapi
 * /search/{query}:
 *   get:
 *     tags: [Search]
 *     summary: Search by query
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/:query", async (req, res) => {
  const { query } = req.params;
  const data = await handleSearchQuery(query);
  res.json(data);
});

/**
 * @openapi
 * /search:
 *   get:
 *     tags: [Search]
 *     summary: Search root
 *     responses:
 *       200:
 *         description: Search response
 */
router.get("/", (req, res) => {
  res.json({ message: "Search" });
});

export default router;