import { Router } from "express";
import { handleSearchQuery, handleSearchCategories, handleSearchCategoryAndQuery, handleSearchCategory } from "../../../controllers/search/controller";

const router = Router();

router.get("/category/:name/:query", (req, res) => {
  const { name, query } = req.params;
  const data = handleSearchCategoryAndQuery(name, query);
  res.json(data);
});

router.get("/category/:name", async (req, res) => {
  const { name } = req.params;
  const data = await handleSearchCategory(name);
  res.json(data);
});

router.get("/category", async (req, res) => {
  const data = await handleSearchCategories();
  res.json(data);
});

router.get("/:query", async (req, res) => {
  const { query } = req.params;
  const data = await handleSearchQuery(query);
  res.json(data);
});

router.get("/", (req, res) => {
  res.json({ message: "Search" });
});

export default router;