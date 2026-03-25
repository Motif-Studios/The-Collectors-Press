import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Account" });
});

router.get("/subscription", (req, res) => {
    res.json({ message: "Account Subscription" })
})

router.post("/subscription/cancel", (req, res) => {
    res.json({ message: "Account Subscription Cancel" })
})

router.post("/subscription/renew", (req, res) => {
    res.json({ message: "Account Subscription Renew" })
})

// router.get("/saved_stories", (req, res) => {
//     res.json({ message: "Account Saved Stories" })
// })

router.get("/help", (req, res) => {
    res.json({ message: "Account Help" })
})


export default router;