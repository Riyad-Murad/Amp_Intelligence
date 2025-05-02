import http from "http";
import axios from "axios";
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

// const LARAVEL_API = "http://server:80/api/v1";
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
        const userId = (data[1] << 8) | data[2];
        const masterId = Buffer.from(data.slice(3, 9)).toString();

        console.log(">> Parsed Master Check-in");
        console.log({ userId, masterId });

        axios
          .post(`${LARAVEL_API}/masters/checkin`, {
            user_id: userId,
            master_id: masterId,
          })
          .catch((err) => console.error("Master Check-in Error:", err.message));

        break;
      }

      case 0x12: {
        // Slave Check-in
        const masterId = Buffer.from(data.slice(1, 7)).toString();
        const slaveId = Buffer.from(data.slice(7, 12)).toString();
        const modbusId = data[12];

        console.log(">> Parsed Slave Check-in");
        console.log({ masterId, slaveId, modbusId });

        axios
          .post(`${LARAVEL_API}/slaves/checkin`, {
            master_id: masterId,
            slave_id: slaveId,
            modbus_id: modbusId,
          })
          .catch((err) => console.error("Slave Check-in Error:", err.message));

        break;
      }

      case 0x14: {
        // Master Lines Data
        const masterId = Buffer.from(data.slice(1, 7)).toString();

        const voltageL1 = (data[7] << 8) | data[8];
        const voltageL2 = (data[9] << 8) | data[10];
        const voltageL3 = (data[11] << 8) | data[12];

        const powerL1 =
          (data[13] << 24) | (data[14] << 16) | (data[15] << 8) | data[16];
        const powerL2 =
          (data[17] << 24) | (data[18] << 16) | (data[19] << 8) | data[20];
        const powerL3 =
          (data[21] << 24) | (data[22] << 16) | (data[23] << 8) | data[24];

        console.log(">> Parsed Master Lines Data");
        console.log({
          masterId,
          voltageL1,
          voltageL2,
          voltageL3,
          powerL1,
          powerL2,
          powerL3,
        });

        axios
          .post(`${LARAVEL_API}/masters/lines`, {
            master_id: masterId,
            voltage_l1: voltageL1,
            voltage_l2: voltageL2,
            voltage_l3: voltageL3,
            power_l1: powerL1,
            power_l2: powerL2,
            power_l3: powerL3,
          })
          .catch((err) =>
            console.error("Master Lines Data Error:", err.message)
          );

        break;
      }

      case 0x16: {
        // Slave Metric Data
        const masterId = Buffer.from(data.slice(1, 7)).toString();
        const slaveId = Buffer.from(data.slice(7, 12)).toString();

        const voltage = (data[12] << 8) | data[13];
        const current = (data[14] << 8) | data[15];
        const power =
          (data[16] << 24) | (data[17] << 16) | (data[18] << 8) | data[19];
        const energy =
          (data[20] << 24) | (data[21] << 16) | (data[22] << 8) | data[23];

        console.log(">> Parsed Slave Metric Data");
        console.log({
          masterId,
          slaveId,
          voltage,
          current,
          power,
          energy,
        });

        axios
          .post(`${LARAVEL_API}/slaves/metrics`, {
            master_id: masterId,
            slave_id: slaveId,
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
