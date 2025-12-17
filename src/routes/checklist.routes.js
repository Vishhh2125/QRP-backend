import express from 'express';
import authMiddleware from '../middleware/auth.Middleware.js';
import {
  submitChecklist,
  approveChecklist,
  requestChanges,
  getChecklistById,
  createChecklistForStage,
  updateChecklist,
  deleteChecklist,
  getAllChecklists, // Add this new controller function
} from '../controllers/checklist.controller.js';

const router = express.Router();

// Get all checklists (filter by stage in frontend)
router.get("/checklists/all",authMiddleware, getAllChecklists);
router.get("/checklists/:id",authMiddleware, getChecklistById); //optional if wannt paticular
router.post("/checklists/create", authMiddleware, createChecklistForStage);
router.put("/checklists/update/:id", authMiddleware, updateChecklist);
router.delete("/checklists/delete/:id", authMiddleware, deleteChecklist);
router.post("/checklists/:id/submit", authMiddleware, submitChecklist); //ooptional 
router.post("/checklists/:id/approve", authMiddleware, approveChecklist);//ooptional 
router.post("/checklists/:id/request-changes", authMiddleware, requestChanges);//optional 
// router.get("/checklists/:id/history", authMiddleware, getChecklistHistory);

export default router;
