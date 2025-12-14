import { Router } from "express";
import { summarize, improve, tone } from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/summarize", verifyJWT, summarize);
router.post("/improve", verifyJWT, improve);
router.post("/tone", verifyJWT, tone);

export default router;
