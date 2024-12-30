import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        toast.success("Register successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
      <div className="absolute top-10 text-center text-white space-y-4">
        <h1 className="text-4xl font-extrabold leading-tight">
          Welcome to Krishna's To Do Application!
        </h1>
        <p className="text-xl font-medium">
          A simple, effective way to keep your tasks organized.
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 m-auto space-y-6">
        <h2 className="text-2xl font-extrabold text-center text-blue-600 mb-6">
          Register to Start Organizing Your Tasks
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>

        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default Register;
