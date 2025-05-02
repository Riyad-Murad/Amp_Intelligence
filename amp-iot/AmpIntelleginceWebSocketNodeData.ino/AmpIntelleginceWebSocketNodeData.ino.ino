#include <WiFi.h>
#include <WebSocketsClient.h>

// WiFi credentials
const char* ssid = "Wise net/rida murad";
const char* password = "1234murad@";

const char* websocket_server = "192.168.1.104";
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
    sendSlaveSensorData();
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

  uint16_t userId = 1;
  packet[1] = (userId >> 8) & 0xFF;
  packet[2] = userId & 0xFF;

  memcpy(&packet[3], "MASTR1", 6);

  webSocket.sendBIN(packet, 9);
  Serial.println("Master check-in sent");
}

// send slave check In dummy data on connection
void sendSlaveCheckIn() {
  uint8_t packet[13];
  packet[0] = 0x12;
  memcpy(&packet[1], "MASTR1", 6);  // Master ID
  memcpy(&packet[7], "SLAV01", 5);  // Slave ID
  packet[12] = 0x01;                // Modbus ID

  webSocket.sendBIN(packet, 13);
  Serial.println("Slave check-in sent");
}

// send master sensor dummy data every 30 seconds
void sendMasterLinesData() {
  uint8_t packet[25];
  packet[0] = 0x14;
  memcpy(&packet[1], "MASTR1", 6);  // Master ID

  uint16_t voltage = 220;
  uint32_t powerL1 = 1000;
  uint32_t powerL2 = 1200;
  uint32_t powerL3 = 900;

  // Voltages
  packet[7] = (voltage >> 8) & 0xFF;
  packet[8] = voltage & 0xFF;
  packet[9] = (voltage >> 8) & 0xFF;
  packet[10] = voltage & 0xFF;
  packet[11] = (voltage >> 8) & 0xFF;
  packet[12] = voltage & 0xFF;

  // Powers
  uint32_t powers[3] = { powerL1, powerL2, powerL3 };
  int idx = 13;
  for (int i = 0; i < 3; i++) {
    packet[idx++] = (powers[i] >> 24) & 0xFF;
    packet[idx++] = (powers[i] >> 16) & 0xFF;
    packet[idx++] = (powers[i] >> 8) & 0xFF;
    packet[idx++] = powers[i] & 0xFF;
  }

  webSocket.sendBIN(packet, 25);
  Serial.println("Master sensor data sent");
}


// send slave sensor dummy data every 30 seconds
void sendSlaveSensorData() {
  uint8_t packet[24];
  packet[0] = 0x16;

  memcpy(&packet[1], "MASTR1", 6);  // Master ID
  memcpy(&packet[7], "SLAV1", 5);   // Slave ID

  uint16_t voltage = 220;
  uint16_t current = 10;
  uint32_t power = 500;
  uint32_t energy = 12000;

  // Voltage
  packet[12] = (voltage >> 8) & 0xFF;
  packet[13] = voltage & 0xFF;

  // Current
  packet[14] = (current >> 8) & 0xFF;
  packet[15] = current & 0xFF;

  // Power
  packet[16] = (power >> 24) & 0xFF;
  packet[17] = (power >> 16) & 0xFF;
  packet[18] = (power >> 8) & 0xFF;
  packet[19] = power & 0xFF;

  // Energy
  packet[20] = (energy >> 24) & 0xFF;
  packet[21] = (energy >> 16) & 0xFF;
  packet[22] = (energy >> 8) & 0xFF;
  packet[23] = energy & 0xFF;

  webSocket.sendBIN(packet, 24);
  Serial.println("Slave sensor data sent");
}
