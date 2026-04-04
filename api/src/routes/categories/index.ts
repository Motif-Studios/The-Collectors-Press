import { Router } from "express";
const router = Router();

router.get("/all", (req, res) => {
    res.json({ message: "All Categories" })
})

router.get("/:category_id", (req, res) => {
    res.json({ message: "Category by Id" })
})

router.get("/:category_name", (req, res) => {
    res.json({ message: "Category by Name" })
})

export default router;