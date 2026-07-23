import { Router } from "express";
import { createProfile, getProfileByUserId } from "../../../controllers/auth/controller";


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

/**
 * @openapi
 * /auth/profile/{user_id}:
 *   get:
 *     tags: [Auth]
 *     summary: Fetch a user profile
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile response
 */
router.get("/profile/:user_id", async (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
        return res.status(400).json({ error: "'user_id' is required" });
    }

    try {
        const profile = await getProfileByUserId(userId);
        return res.json(profile ?? { id: userId, user_type: "normal" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load profile";
        return res.status(500).json({ error: message });
    }
});

export default router;
