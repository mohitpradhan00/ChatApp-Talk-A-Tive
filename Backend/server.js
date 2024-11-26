import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";
import messageRoutes from "./routes/MessageRoutes.js"; // Fixed the path
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Add .js extension
import path from "path";
import cors from "cors"; // Importing CORS
import { Connectdb } from "./config/db.js"; // Ensure the correct import path
import { fileURLToPath } from "url";

dotenv.config();
console.log("MongoDB URI:", process.env.MONGO_URI);
Connectdb();
const app = express();

app.use(express.json()); // to accept json data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enabling CORS for all routes
app.use(cors());

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Add other methods if needed
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers if needed
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
