import { Router } from "express";
import { getAllCategories, getCategoryById, getCategoriesByName } from "../../../controllers/category/controller";

const router = Router();

router.get("/all", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

router.get("/:category_id", async (req, res) => {
    try {
        const category = await getCategoryById(parseInt(req.params.category_id));
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category" });
    }
});

router.get("/name/:category_name", async (req, res) => {
    try {
        const category = await getCategoriesByName(req.params.category_name);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category" });
    }
});

export default router;