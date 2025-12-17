import { Router } from "express";
import {
  createCheckPoint,
  getCheckpointsByChecklistId,
  updateCheckpointResponse,
  deleteCheckPoint,
  getCheckPointById,
  
} from "../controllers/checkpoint.controller.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// Get all checkpoints for a specific checklist
router.get(
  "/:checkListId",
  getCheckpointsByChecklistId
);

// Create a new checkpoint for a checklist
router.post(
  "/:checkListId",
  createCheckPoint
);

// Update checkpoint response (with optional images)
router.patch(
  "/:checkpointId",
  upload.array("images", 5),
  updateCheckpointResponse
);

// Delete a checkpoint
router.delete(
  "/:checkpointId",
  deleteCheckPoint
);
router.get("/checkpoints/:checkpointId",  getCheckPointById);
// router.get("/checklists/:checkListId/checkpoints", getCheckpointsByChecklist);
export default router;
