import { Router } from "express";
import { getTasksByProjectId } from "../controllers/taskController";

const router = Router();

router.get("/project/:id", getTasksByProjectId);

export default router;
