import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

const authMiddleware = async (req, _, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find user by _id from decoded token
    const user = await User.findById(decoded?._id).select("-password").populate("role");

    if (!user) {
      throw new ApiError(401, "Invalid token - user not found");
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new ApiError(401, "Invalid token"));
    } else if (error.name === "TokenExpiredError") {
      next(new ApiError(401, "Token expired"));
    } else {
      next(error);
    }
  }
};

export default authMiddleware;
