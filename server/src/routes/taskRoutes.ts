import { Router } from "express";
import {
  createTask,
  getTasksByProjectId,
  getTasksByUserId,
  updateTaskStatusById,
} from "../controllers/taskController";

const router = Router();

router.get("/project/:id", getTasksByProjectId);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatusById);
router.get("/user/:id", getTasksByUserId);

export default router;
