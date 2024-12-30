import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

// connecting the database

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/user", router);
mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => {
    console.log("Coonecting the database");
  })
  .catch((error) => {
    console.log("Failed to connect toDb");
  });

app.listen(PORT, () => {
  console.log("Listing the port", PORT);
});
