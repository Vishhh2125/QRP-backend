import express from "express";
import authMiddleware from "../middleware/auth.Middleware.js";
import { getStageById, updateStage, deleteStage, listStagesForProject, createStage } from "../controllers/stage.controller.js";

const router = express.Router();

router.get("/:id", getStageById);
router.put("/:id", updateStage);
router.delete("/:id", deleteStage);

// Moved from project.routes.js:
// GET/POST /api/v1/projects/:projectId/stages (protected)
router.get("/projects/:projectId/stages", authMiddleware, listStagesForProject);
router.post("/projects/:projectId/stages", authMiddleware, createStage);


export default router;