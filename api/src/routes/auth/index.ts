import { Router } from "express";
const router = Router();

router.post("/signup", (req, res) => {
    res.json({ message: "Sign up" })
})

router.post("/login", (req, res) => {
    res.json({ message: "Login" })
})

export default router;