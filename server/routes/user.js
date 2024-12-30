import express from "express";
import { login, logout, register } from "../controller/user.js";
import {
  createToDo,
  deleteToDo,
  getAllToDos,
  updateTodos,
} from "../controller/todo.js";
import { isAuthenticated } from "../middleware/isAuthenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/createTodo", isAuthenticated, createToDo);
router.get("/todos", isAuthenticated, getAllToDos);
router.put("/updateTodo/:todoId", isAuthenticated, updateTodos);
router.delete("/deleteTodo/:todoId", isAuthenticated, deleteToDo);

export default router;
