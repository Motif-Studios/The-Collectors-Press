import { Router } from "express";
import { getAllCategories, getCategoryById, getCategoriesByName, getCategoryByArticleId } from "../../../controllers/category/controller";

const router = Router();

/**
 * @openapi
 * /categories/all:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Categories list
 *       500:
 *         description: Failed to fetch categories
 */
router.get("/all", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

/**
 * @openapi
 * /categories/{category_id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category data
 *       500:
 *         description: Failed to fetch category
 */
router.get("/:category_id", async (req, res) => {
    try {
        const category = await getCategoryById(parseInt(req.params.category_id));
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category" });
    }
});

/**
 * @openapi
 * /categories/name/{category_name}:
 *   get:
 *     tags: [Categories]
 *     summary: Get categories by name
 *     parameters:
 *       - in: path
 *         name: category_name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching categories
 *       500:
 *         description: Failed to fetch category
 */
router.get("/name/:category_name", async (req, res) => {
    try {
        const category = await getCategoriesByName(req.params.category_name);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category" });
    }
});


/**
 * @openapi
 * /categories/article/{article_id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get category by article ID
 *     parameters:
 *       - in: path
 *         name: article_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category data
 *       500:
 *         description: Failed to fetch category
 */
router.get("/article/:article_id", async (req, res) => {
    try {
        const category = await getCategoryByArticleId(req.params.article_id);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category" });
    }
});

export default router;