import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Subscriptions" });
});

router.get("/learn", (req, res) => {
  res.json({ message: "Learn about subscription" });
});

router.post("/payment", (req, res) => {
  res.json({ message: "Subscription Payment" });
});


export default router;