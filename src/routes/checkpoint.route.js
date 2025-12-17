import {Router} from "express";
// import authMiddleware from "../middleware/auth.Middleware";


const router = Router();




router.route("/create").post()
router.route("/:checkPointId").get()
// router.route("/:checkPointId/edit").
router.route("/delete/:checkPointId").delete()