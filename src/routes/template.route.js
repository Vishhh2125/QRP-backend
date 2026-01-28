import { Router } from "express";
import authMiddleware from "../middleware/auth.Middleware.js";

import {
  createTemplate,
  getTemplate,
  addStage,
  addSubtopic,
  deleteSubtopic,
  addCheckpoint,
  deleteCheckpoint,
} from "../controllers/template.controller.js";

const router = Router();

/**
 * Template Routes (Only ONE template in system)
 */
// Create a new template
router.post("/", authMiddleware, createTemplate);           // POST /api/templates

// Get the template
router.get("/", authMiddleware, getTemplate);              // GET /api/templates

/**
 * Stage Routes
 */
// Add a stage to the template
router.post("/:templateId/stages", authMiddleware, addStage);  // POST /api/templates/:templateId/stages

/**
 * SubTopic Routes
 */
// Add a subtopic to a specific stage
router.post(
  "/:templateId/stages/:stageId/subtopics",
  authMiddleware,
  addSubtopic
);                                                           // POST /api/v1/template/:templateId/stages/:stageId/subtopics

// Delete a subtopic from a specific stage
router.delete(
  "/:templateId/stages/:stageId/subtopics/:subTopicId",
  authMiddleware,
  deleteSubtopic
);                                                           // DELETE /api/v1/template/:templateId/stages/:stageId/subtopics/:subTopicId

/**
 * Checkpoint Routes
 */
// Add a checkpoint to a specific subtopic
router.post(
  "/:templateId/stages/:stageId/subtopics/:subTopicId/checkpoints",
  authMiddleware,
  addCheckpoint
);                                                           // POST /api/v1/template/:templateId/stages/:stageId/subtopics/:subTopicId/checkpoints

// Delete a checkpoint from a specific subtopic
router.delete(
  "/:templateId/stages/:stageId/subtopics/:subTopicId/checkpoints/:checkpointId",
  authMiddleware,
  deleteCheckpoint
);                                                           // DELETE /api/v1/template/:templateId/stages/:stageId/subtopics/:subTopicId/checkpoints/:checkpointId

export default router;