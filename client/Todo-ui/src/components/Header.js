import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("logout successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold flex-grow text-left">
        To Do Application
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-500 font-medium px-4 py-2 rounded hover:bg-blue-100 transition"
      >
        Logout
      </button>
      <ToastContainer position="top-right" autoClose={5000} />
    </header>
  );
};

export default Header;
