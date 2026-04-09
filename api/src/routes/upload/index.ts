import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  // Handle file upload logic here
  res.json({ message: "File uploaded successfully" });
});

export default router;