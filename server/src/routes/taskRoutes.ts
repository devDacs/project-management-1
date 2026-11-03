import { Router } from "express";
import { createTask, getTasksByProjectId } from "../controllers/taskController";

const router = Router();

router.get("/project/:id", getTasksByProjectId);
router.post("/", createTask);

export default router;
