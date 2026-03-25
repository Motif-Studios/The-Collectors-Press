import { Router } from "express";
const router = Router();

router.get("/category/:id/:query", (req, res) => {
  res.json({ message: "Search by Category and Query" });
});

router.get("/category/:id", (req, res) => {
  res.json({ message: "Search by Category" });
});

router.get("/:query", (req, res) => {
  res.json({ message: "Search Query" });
});

router.get("/", (req, res) => {
  res.json({ message: "Search" });
});

export default router;