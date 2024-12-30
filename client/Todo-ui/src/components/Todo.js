import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [modelDefaults, setModelDefaults] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //post the todo

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/createTodo",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Todo  Added successful");
        setIsOpen(false);
        getAllTodo();
        setFormData({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  // get all todo

  const getAllTodo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/todos", {
        withCredentials: true,
      });
      setTodos(response.data.todo);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  //delete the todo

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user/deleteTodo/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.type === "success") {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
      toast.success("Todo  Delete successful");
      getAllTodo();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  //edit the todo
  const editTodo = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/deleteTodo/${id}"
      );
    } catch (error) {}
    setIsOpen(true);
  };

  //search according to title and description

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);
  };

  return (
    <div className="min-h-screen bg-gray-100  p-4">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add TODO
      </button>

      <div className="flex justify-end">
        <aside className="w-1/4 bg-white shadow-md rounded-lg p-4 mr-6">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            onChange={handleSearch}
          />
        </aside>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add To-Do</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Add To-Do
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Todo List</h1>
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {todo.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {todo.description || "No description provided."}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => editTodo(todo._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
