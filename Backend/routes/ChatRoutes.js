import express from 'express';
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from '../controllers/chatControllers.js';
import { protect } from '../middleware/authMiddleware.js';



const ChatRoutes = express.Router();

ChatRoutes.route("/").post(protect, accessChat);
ChatRoutes.route("/").get(protect, fetchChats);
ChatRoutes.route("/group").post(protect, createGroupChat);
ChatRoutes.route("/rename").put(protect, renameGroup);
ChatRoutes.route("/groupremove").put(protect, removeFromGroup);
ChatRoutes.route("/groupadd").put(protect, addToGroup);




export default ChatRoutes;