import { User } from "../modals/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//register user
export const register = async (req, resp) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return resp
        .status(400)
        .json({ success: false, message: "All field is required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return resp
        .status(400)
        .json({ success: false, message: "Email id already exits" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashPassword });
    await newUser.save();
    return resp.status(200).json({
      success: true,
      message: "Account created successfully",
      newUser,
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// login user

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return resp
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(400)
        .json({ success: false, message: "Incorrect Username or Password" });
    }

    // Verify password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return resp
        .status(400)
        .json({ success: false, message: "Incorrect Username or Password" });
    }

    // Generate token
    const token = await jwt.sign(
      { user: { id: user._id } }, // Ensure payload matches middleware expectations
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Store token in cookie
    resp.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return resp
      .status(200)
      .json({ success: true, message: `Welcome back ${user.fullname}` });
  } catch (error) {
    console.error("Login Error:", error);
    return resp.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, resp) => {
  try {
    resp.cookie("authToken", "", {
      httpOnly: true,
      sameSite: "strict",
    });
    return resp
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return resp.status(500).json({ success: false, message: error.message });
  }
};
