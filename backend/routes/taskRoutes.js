import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/",authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/reorder", authMiddleware, reorderTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
