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
        const response = await createProfile(user_id);
        res.json(response);
    } catch (error) {
        res.status(500).json();
    }   
});

export default router;
