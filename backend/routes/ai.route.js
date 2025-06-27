import express from "express";
import secureRoute from "../middleware/secureRoutes.js";
import { aiChat,aiSuggest } from "../controller/ai.controller.js";
const router = express.Router();

router.post("/chat", secureRoute, aiChat);
router.post("/suggest", secureRoute, aiSuggest);

export default router;