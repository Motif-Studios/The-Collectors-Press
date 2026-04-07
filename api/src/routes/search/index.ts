import { Router } from "express";
import { handleSearchQuery } from "../../../controllers/search/controller";

const router = Router();

router.get("/category/:id/:query", (req, res) => {
  res.json({ message: "Search by Category and Query" });
});

router.get("/category/:id", (req, res) => {
  res.json({ message: "Search by Category" });
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