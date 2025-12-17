import {Router} from "express";
import authMiddleware from "../middleware/auth.Middleware";
import { createTemplate, getTemplate, editTemplate, deleteTemplate } from "../controllers/template.controller.js";

const router = Router();

router.route("/create").post(authMiddleware, createTemplate);
router.route("/edit").post(authMiddleware, editTemplate);
router.route("/get").get(authMiddleware, getTemplate);
router.route("/delete").delete(authMiddleware, deleteTemplate);

export default router;