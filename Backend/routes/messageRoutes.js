import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageControllers.js";

const messageRoutes = express.Router();

messageRoutes.route("/").post(protect, sendMessage);
messageRoutes.route('/:chatId').get(protect,allMessages);

export default messageRoutes;

