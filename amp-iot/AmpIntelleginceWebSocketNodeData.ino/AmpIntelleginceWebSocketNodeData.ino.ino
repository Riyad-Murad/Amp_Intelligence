#include <WiFi.h>
#include <WebSocketsClient.h>

// WiFi credentials
const char* ssid = "Wise net/rida murad";
const char* password = "1234murad@";

const char* websocket_server = "13.38.59.230";
const uint16_t websocket_port = 3001;
const char* websocket_path = "/";

WebSocketsClient webSocket;

bool checkInSent = false;
unsigned long lastDataSendTime = 0;

void setup() {
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected. IP address: ");
  Serial.println(WiFi.localIP());

  // Setup WebSocket
  webSocket.begin(websocket_server, websocket_port, websocket_path);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop() {
  webSocket.loop();

  if (WiFi.status() != WL_CONNECTED) return;

  unsigned long now = millis();

  // Send periodic sensor data
  if (checkInSent && now - lastDataSendTime > 30000) {
    sendMasterLinesData();
    sendSlaveMetricData();
    lastDataSendTime = now;
  }
}

// function to execute certain code on certain events
void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_CONNECTED:
      Serial.println("WebSocket connected");
      sendMasterCheckIn();
      delay(1000);  // short delay
      sendSlaveCheckIn();
      checkInSent = true;
      break;

    case WStype_DISCONNECTED:
      Serial.println("WebSocket disconnected");
      checkInSent = false;
      break;

    case WStype_TEXT:
      Serial.printf("Received text: %s\n", payload);
      break;

    case WStype_BIN:
      Serial.println("Received binary data");
      break;
  }
}

// send master check In dummy data on connection
void sendMasterCheckIn() {
  uint8_t packet[9];
  packet[0] = 0x10;

  memcpy(&packet[1], "MASTR1", 6);

  webSocket.sendBIN(packet, 7);
  Serial.println("Master check-in sent");
}

// send slave check In dummy data on connection
void sendSlaveCheckIn() {
  uint8_t packet[4];
  packet[0] = 0x12;

  uint16_t master_id = 1;
  packet[1] = (master_id >> 8) & 0xFF;
  packet[2] = master_id & 0xFF;

  packet[3] = 0x01;  // Modbus ID

  webSocket.sendBIN(packet, 4);
  Serial.println("Slave check-in sent");
}

// send master sensor dummy data every 30 seconds
void sendMasterLinesData() {
  uint8_t packet[21];
  packet[0] = 0x14;

  uint16_t master_id = 1;

  packet[1] = (master_id >> 8) & 0xFF;
  packet[2] = master_id & 0xFF;

  uint16_t voltage_l1 = 220;
  uint16_t voltage_l2 = 220;
  uint16_t voltage_l3 = 220;
  uint32_t power_l1 = 1000;
  uint32_t power_l2 = 1200;
  uint32_t power_l3 = 900;

  // Voltages
  uint16_t voltages[3] = { voltage_l1, voltage_l2, voltage_l3 };
  int index = 3;
  for (int i = 0; i < 3; i++) {
    packet[index++] = (voltages[i] >> 8) & 0xFF;
    packet[index++] = voltages[i] & 0xFF;
  }

  // Powers
  uint32_t powers[3] = { power_l1, power_l2, power_l3 };
  int idx = 9;
  for (int i = 0; i < 3; i++) {
    packet[idx++] = (powers[i] >> 24) & 0xFF;
    packet[idx++] = (powers[i] >> 16) & 0xFF;
    packet[idx++] = (powers[i] >> 8) & 0xFF;
    packet[idx++] = powers[i] & 0xFF;
  }

  webSocket.sendBIN(packet, 21);
  Serial.println("Master sensor data sent");
}

// send slave sensor dummy data every 30 seconds
void sendSlaveMetricData() {
  uint8_t packet[17];
  packet[0] = 0x16;

  uint16_t master_id = 1;
  uint16_t slave_id = 1;

  packet[1] = (master_id >> 8) & 0xFF;
  packet[2] = master_id & 0xFF;

  packet[3] = (slave_id >> 8) & 0xFF;
  packet[4] = slave_id & 0xFF;

  uint16_t voltage = 220;
  uint16_t current = 10;
  uint32_t power = 500;
  uint32_t energy = 12000;

  // Voltage
  packet[5] = (voltage >> 8) & 0xFF;
  packet[6] = voltage & 0xFF;

  // Current
  packet[7] = (current >> 8) & 0xFF;
  packet[8] = current & 0xFF;

  // Power
  packet[9] = (power >> 24) & 0xFF;
  packet[10] = (power >> 16) & 0xFF;
  packet[11] = (power >> 8) & 0xFF;
  packet[12] = power & 0xFF;

  // Energy
  packet[13] = (energy >> 24) & 0xFF;
  packet[14] = (energy >> 16) & 0xFF;
  packet[15] = (energy >> 8) & 0xFF;
  packet[16] = energy & 0xFF;

  webSocket.sendBIN(packet, 17);
  Serial.println("Slave metric data sent");
}
