import { Router } from "express";


const router = Router();

router.post("/signup", (req, res) => {
    res.json({ message: "temp signup" })
})
router.post("/login", (req, res) => {
    res.json({ message: "temp login" })
})

export default router;
