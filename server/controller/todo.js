//create the todo

import { Todo } from "../modals/todo.js";

export const createToDo = async (req, resp) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return resp
        .status(400)
        .json({ success: false, message: "All field are required" });
    }
    const todo = new Todo({ title, description });
    resp
      .status(200)
      .json({ success: true, message: "Todo created successfully", todo });
    todo.save();
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

//get all todo

export const getAllToDos = async (req, resp) => {
  try {
    const todo = await Todo.find();
    resp.status(200).json({ success: true, todo });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

//update the todos

export const updateTodos = async (req, resp) => {
  try {
    const todoID = req.params.todoId;
    const title = req.body;
    const todo = await Todo.findByIdAndUpdate(todoID, title, { new: true });
    await todo.save();
    resp
      .status(200)
      .json({ success: true, message: "title update successfully", todo });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
//delete the todo

export const deleteToDo = async (req, resp) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);
    resp.status(200).json({ success: true, message: "delete  successfully" });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
