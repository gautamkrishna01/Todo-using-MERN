import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, resp, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return resp
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }
    const decord = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decord) {
      resp.status(401).json({ success: false, message: "Invalid Token" });
    }
    req.id = decord.user.id;
    next();
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
