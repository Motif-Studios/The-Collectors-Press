import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Dashboard" });
});


router.get("/articles", (req, res) => {
  res.json({ message: "Dashboard Articles" });
});

router.get("/articles/:status", (req, res) => {
  res.json({ message: "Dashboard Articles by status" });
});

// router.get("/acticles/:article_id/edit", (req, res) => {
//   res.json({ message: "Dashboard" });
// });

router.get("/preview_article", (req, res) => {
  res.json({ message: "Dashboard Articles by Article ID" });
});

router.post("/create_article", (req, res) => {
  res.json({ message: "Created Article" });
});

router.post("/publish_article", (req, res) => {
  res.json({ message: "Published Article" });
});

router.post("/delete_article", (req, res) => {
  res.json({ message: "Published Article" });
});

export default router;