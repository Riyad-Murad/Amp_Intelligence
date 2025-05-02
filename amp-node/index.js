import http from "http";
import axios from "axios";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

const LARAVEL_API = "http://server:80/api/v1";
// const LARAVEL_API = "http://localhost:8000/api/v1";

wss.on("connection", (ws) => {
  console.log("ESP32 connected");

  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      console.log("Binary data received:", data);
      console.log("Raw bytes:", [...data]);
    } else {
      console.log("Text message received:", data.toString());
    }
  });

  ws.on("close", () => {
    console.log("ESP32 disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
