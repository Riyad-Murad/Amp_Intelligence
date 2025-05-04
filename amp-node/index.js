import http from "http";
import axios from "axios";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

// const LARAVEL_API = "http://laravel-server:80/api/v1";
const LARAVEL_API = "http://localhost:8000/api/v1";

wss.on("connection", (ws) => {
  console.log("ESP32 connected");

  ws.on("message", (data, isBinary) => {
    if (!isBinary) {
      console.log("Text message received:", data.toString());
      return;
    }

    console.log("\n--- Raw Binary Received ---");
    console.log([...data]);

    const packetType = data[0];

    switch (packetType) {
      case 0x10: {
        // Master Check-in
        const user_id = (data[1] << 8) | data[2];
        const name = Buffer.from(data.slice(3, 9)).toString();

        console.log(">> Parsed Master Check-in");
        console.log({ user_id, name });

        axios
          .post(`${LARAVEL_API}/masterCheckIn`, {
            user_id,
            name,
          })
          .catch((err) => console.error("Master Check-in Error:", err.message));

        break;
      }

      case 0x12: {
        // Slave Check-in
        const master_id = (data[1] << 8) | data[2];
        const modbus_id = data[3];

        console.log(">> Parsed Slave Check-in");
        console.log({ master_id, modbus_id });

        axios
          .post(`${LARAVEL_API}/slaveCheckIn`, {
            master_id,
            modbus_id,
          })
          .catch((err) => console.error("Slave Check-in Error:", err.message));

        break;
      }

      case 0x14: {
        // Master Lines Data
        const master_id = (data[1] << 8) | data[2];

        const voltage_l1 = (data[3] << 8) | data[4];
        const voltage_l2 = (data[5] << 8) | data[6];
        const voltage_l3 = (data[7] << 8) | data[8];

        const power_l1 =
          (data[9] << 24) | (data[10] << 16) | (data[11] << 8) | data[12];
        const power_l2 =
          (data[13] << 24) | (data[14] << 16) | (data[15] << 8) | data[16];
        const power_l3 =
          (data[17] << 24) | (data[18] << 16) | (data[19] << 8) | data[20];

        console.log(">> Parsed Master Lines Data");
        console.log({
          master_id,
          voltage_l1,
          voltage_l2,
          voltage_l3,
          power_l1,
          power_l2,
          power_l3,
        });

        axios
          .post(`${LARAVEL_API}/lines`, {
            master_id,
            voltage_l1,
            voltage_l2,
            voltage_l3,
            power_l1,
            power_l2,
            power_l3,
          })
          .catch((err) =>
            console.error("Master Lines Data Error:", err.message)
          );

        break;
      }

      case 0x16: {
        // Slave Metric Data
        const master_id = (data[1] << 8) | data[2];
        const slave_id = (data[3] << 8) | data[4];

        const voltage = (data[5] << 8) | data[6];
        const current = (data[7] << 8) | data[8];
        const power =
          (data[9] << 24) | (data[10] << 16) | (data[11] << 8) | data[12];
        const energy =
          (data[13] << 24) | (data[14] << 16) | (data[15] << 8) | data[16];

        console.log(">> Parsed Slave Metric Data");
        console.log({
          master_id,
          slave_id,
          voltage,
          current,
          power,
          energy,
        });

        axios
          .post(`${LARAVEL_API}/metrics`, {
            master_id,
            slave_id,
            voltage,
            current,
            power,
            energy,
          })
          .catch((err) => console.error("Slave Metrics Error:", err.message));

        break;
      }

      default:
        console.log("Unknown packet type:", packetType);
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
