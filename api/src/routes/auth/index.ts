import { Router } from "express";
import { createProfile } from "../../../controllers/auth/controller";


const router = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     responses:
 *       200:
 *         description: Signup response
 */
router.post("/create_profile", async (req, res) => {
    const user_id = req.body.user_id;
    try {
        if (!user_id) {
            return res.status(400).json({ error: "'user_id' is required" });
        }

        const response = await createProfile(user_id);
        res.json(response);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Email already in use";
        res.status(500).json({ error: message });
    }   
});

export default router;
