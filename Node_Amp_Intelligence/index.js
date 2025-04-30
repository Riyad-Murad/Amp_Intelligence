import http from "http";
import cors from "cors";
import axios from "axios";
import express from "express";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const LARAVEL_API = "http://server:80/api/v1";
// const LARAVEL_API = "http://localhost:8000/api/v1";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("ESP32 connected:", socket.id);

  socket.on("message", (data, isBinary) => {
    if (isBinary) {
      console.log("Received binary data from ESP32:", data);
      console.log("Raw bytes:", [...data]); // prints array of byte values
      // You can save this to DB or forward to Laravel here in the future.
    } else {
      console.log("Received text data (not binary):", data.toString());
    }
  });

  socket.on("disconnect", () => {
    console.log("ESP32 disconnected:", socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
